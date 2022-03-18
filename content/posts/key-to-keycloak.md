---
title: "The Key to Keycloak"
date: 2021-12-12
draft: false
author: Theresa Henze
image: /images/keycloak_logo_200px.svg
tags: ["Keycloak", "identity management", "auth", "spi"]
description: "Extend Keycloak SPI to implement custom identity management behaviour"
---

Keycloak is our go-to tool when it comes to identity management, federating identities over multiple sources and organizing and managing roles for all kinds of applications.
Naturally, there is no "one-tool-fits-all", so Keycloak too sometimes needs to be customized beyond what the configuration offers, and we need to implement providers to add additional configuration.

<!--more-->

Being a complex project, Keycloak can be intimidating at first glance, but once we learn how the general architecture and workflows look like we can precisely implement providers to fine-tune Keycloak's behaviour.

Let us take a look into what Keycloak does is when a user is authenticated, and see how we can implement such a provider:

![Keycloak Auth](/images/keycloak-auth.png)

We can see multiple points marked with "SPI" (service provider interface). These are all the points where we can provide additional or alternative implementations, and alter the way Keycloak works.
Please note, some API's are private, which means they can change in any way during Keycloak updates. So one has to be careful where and when functionality is added.

In our example we want to implement a new token mapper, to have some claims mapped in a specific way.
To do this, we setup a small Java project in our favorite Editor, throw in some gradle build scripts (maven works too, of course!) and define our entry point and a marker for Keycloak to load our provider:

![Keycloak Code](/images/keycloak-code.png)

```java
package mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.keycloak.Config;
import org.keycloak.models.ClientSessionContext;
import org.keycloak.models.KeycloakSession;
import org.keycloak.models.KeycloakSessionFactory;
import org.keycloak.models.ProtocolMapperModel;
import org.keycloak.models.UserSessionModel;
import org.keycloak.protocol.ProtocolMapper;
import org.keycloak.protocol.oidc.OIDCLoginProtocol;
import org.keycloak.protocol.oidc.mappers.OIDCAccessTokenMapper;
import org.keycloak.protocol.oidc.mappers.OIDCAttributeMapperHelper;
import org.keycloak.protocol.oidc.mappers.OIDCIDTokenMapper;
import org.keycloak.protocol.oidc.mappers.UserInfoTokenMapper;
import org.keycloak.provider.ProviderConfigProperty;
import org.keycloak.representations.AccessToken;
import org.keycloak.representations.IDToken;

public class AttributeMapper
        implements ProtocolMapper, OIDCAccessTokenMapper, OIDCIDTokenMapper, UserInfoTokenMapper {
    private static final List<ProviderConfigProperty> configProperties = new ArrayList<>();

    public final String PROVIDER_ID = "custom_attribute_mapper";

    static {
        OIDCAttributeMapperHelper.addIncludeInTokensConfig(configProperties, AttributeMapper.class);
    }

    private void mapClaims(Map<String, Object> claims, UserSessionModel userSession, Map<String, String> config) {
        claims.put("custom_attribute", "some custom value");
    }

    @Override
    public String getDisplayCategory() {
        return "Custom Mappers";
    }

    @Override
    public String getDisplayType() {
        return "Attribute Mapper";
    }

    @Override
    public String getHelpText() {
        return "Set attributes";
    }

    @Override
    public List<ProviderConfigProperty> getConfigProperties() {
        return configProperties;
    }

    @Override
    public String getId() {
        return PROVIDER_ID;
    }

    @Override
    public String getProtocol() {
        return OIDCLoginProtocol.LOGIN_PROTOCOL;
    }

    @Override
    public ProtocolMapper create(KeycloakSession arg0) {
        throw new RuntimeException("UNSUPPORTED METHOD");
    }

    @Override
    public void init(Config.Scope arg0) {
    }

    @Override
    public void postInit(KeycloakSessionFactory arg0) {
    }

    @Override
    public void close() {
    }

    public AccessToken transformAccessToken(AccessToken token, ProtocolMapperModel mappingModel,
            KeycloakSession session, UserSessionModel userSession, ClientSessionContext clientSessionCtx) {
        if (!OIDCAttributeMapperHelper.includeInAccessToken(mappingModel)) {
            return token;
        }
        this.mapClaims(token.getOtherClaims(), userSession, mappingModel.getConfig());
        return token;
    }

    public IDToken transformIDToken(IDToken token, ProtocolMapperModel mappingModel, KeycloakSession session,
            UserSessionModel userSession, ClientSessionContext clientSessionCtx) {
        if (!OIDCAttributeMapperHelper.includeInIDToken(mappingModel)) {
            return token;
        }
        this.mapClaims(token.getOtherClaims(), userSession, mappingModel.getConfig());
        return token;
    }

    public AccessToken transformUserInfoToken(AccessToken token, ProtocolMapperModel mappingModel,
            KeycloakSession session,
            UserSessionModel userSession, ClientSessionContext clientSessionCtx) {
        if (!OIDCAttributeMapperHelper.includeInUserInfo(mappingModel)) {
            return token;
        }
        this.mapClaims(token.getOtherClaims(), userSession, mappingModel.getConfig());
        return token;
    }
}
```

Now we can add the mapper to a client and evaluate it using the Keycloak admin console.

![Keycloak Mapper](/images/keycloak-mapper.png)

You can find the official Keycloak documentation here: [https://www.keycloak.org/docs/latest/server_development/#_providers](https://www.keycloak.org/docs/latest/server_development/#_providers)
