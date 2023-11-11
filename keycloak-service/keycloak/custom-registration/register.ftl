<#import "template.ftl" as layout>
<#import "register-commons.ftl" as registerCommons>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('firstName','lastName','email','username' 'user.attributes.phone','user.attributes.organization-name''user.attributes.nip','user.attributes.regon','user.attributes.krs','user.attributes.organization-type','password','password-confirm','termsAccepted'); section>
    <#if section = "header">
        ${msg("registerTitle")}
    <#elseif section = "form">
        <form id="kc-register-form" class="${properties.kcFormClass!}" action="${url.registrationAction}" method="post">
            <div class="form-container">
                <div class="form-column">
                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="firstName" class="${properties.kcLabelClass!}">${msg("firstName")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="firstName" class="${properties.kcInputClass!}" name="firstName"
                                value="${(register.formData.firstName!'')}"
                                aria-invalid="<#if messagesPerField.existsError('firstName')>true</#if>"
                            />

                            <#if messagesPerField.existsError('firstName')>
                                <span id="input-error-firstname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('firstName'))?no_esc}
                                </span>
                            </#if>
                        </div>
                    </div>

                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="lastName" class="${properties.kcLabelClass!}">${msg("lastName")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="lastName" class="${properties.kcInputClass!}" name="lastName"
                                value="${(register.formData.lastName!'')}"
                                aria-invalid="<#if messagesPerField.existsError('lastName')>true</#if>"
                            />

                            <#if messagesPerField.existsError('lastName')>
                                <span id="input-error-lastname" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('lastName'))?no_esc}
                                </span>
                            </#if>
                        </div>
                    </div>

                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="email" class="${properties.kcLabelClass!}">${msg("email")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="email" class="${properties.kcInputClass!}" name="email"
                                value="${(register.formData.email!'')}" autocomplete="email"
                                aria-invalid="<#if messagesPerField.existsError('email')>true</#if>"
                            />

                            <#if messagesPerField.existsError('email')>
                                <span id="input-error-email" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('email'))?no_esc}
                                </span>
                            </#if>
                        </div>
                    </div>

                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="user.attributes.phone" class="${properties.kcLabelClass!}">${msg("phoneNumber")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="tel" id="user.attributes.phone" class="${properties.kcInputClass!}" name="user.attributes.phone"
                                value="${(register.formData['user.attributes.phone']!'')}" autocomplete="tel"
                                aria-invalid="<#if messagesPerField.existsError('user.attributes.phone')>true</#if>"
                            />
                            <#if messagesPerField.existsError('user.attributes.phone')>
                                <span id="input-error-phone" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('user.attributes.phone'))?no_esc}
                                </span>
                            </#if>
                        </div>
                    </div>

                    <#if !realm.registrationEmailAsUsername>
                        <div class="${properties.kcFormGroupClass!}">
                            <div class="${properties.kcLabelWrapperClass!}">
                                <label for="username" class="${properties.kcLabelClass!}">${msg("username")}</label>
                            </div>
                            <div class="${properties.kcInputWrapperClass!}">
                                <input type="text" id="username" class="${properties.kcInputClass!}" name="username"
                                    value="${(register.formData.username!'')}" autocomplete="username"
                                    aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"
                                />

                                <#if messagesPerField.existsError('username')>
                                    <span id="input-error-username" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                        ${kcSanitize(messagesPerField.get('username'))?no_esc}
                                    </span>
                                </#if>
                            </div>
                        </div>
                    </#if>

                    <#if passwordRequired??>
                        <div class="${properties.kcFormGroupClass!}">
                            <div class="${properties.kcLabelWrapperClass!}">
                                <label for="password" class="${properties.kcLabelClass!}">${msg("password")}</label>
                            </div>
                            <div class="${properties.kcInputWrapperClass!}">
                                <input type="password" id="password" class="${properties.kcInputClass!}" name="password"
                                    autocomplete="new-password"
                                    aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
                                />

                                <#if messagesPerField.existsError('password')>
                                    <span id="input-error-password" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                        ${kcSanitize(messagesPerField.get('password'))?no_esc}
                                    </span>
                                </#if>
                            </div>
                        </div>

                        <div class="${properties.kcFormGroupClass!}">
                            <div class="${properties.kcLabelWrapperClass!}">
                                <label for="password-confirm"
                                    class="${properties.kcLabelClass!}">${msg("passwordConfirm")}</label>
                            </div>
                            <div class="${properties.kcInputWrapperClass!}">
                                <input type="password" id="password-confirm" class="${properties.kcInputClass!}"
                                    name="password-confirm"
                                    aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"
                                />

                                <#if messagesPerField.existsError('password-confirm')>
                                    <span id="input-error-password-confirm" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                        ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                                    </span>
                                </#if>
                            </div>
                        </div>
                    </#if>
                </div>
                <div class="form-column">
                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="user.attributes.organization-name" class="${properties.kcLabelClass!}">${msg("organizationName")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="user.attributes.organization-name" class="${properties.kcInputClass!}" name="user.attributes.organization-name"
                                value="${(register.formData['user.attributes.organization-name']!'')}"
                                aria-invalid="<#if messagesPerField.existsError('user.attributes.organization-name')>true</#if>"
                            />
                            <#if messagesPerField.existsError('user.attributes.organization-name')>
                                <span id="input-error-organization-name" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('user.attributes.organization-name'))?no_esc}
                                </span>
                            </#if>
                        </div>
                    </div>

                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="user.attributes.nip" class="${properties.kcLabelClass!}">${msg("nip")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="user.attributes.nip" class="${properties.kcInputClass!}" name="user.attributes.nip"
                                value="${(register.formData['user.attributes.nip']!'')}"
                                aria-invalid="<#if messagesPerField.existsError('user.attributes.nip')>true</#if>"
                            />
                            <#if messagesPerField.existsError('user.attributes.nip')>
                                <span id="input-error-nip" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('user.attributes.nip'))?no_esc}
                                </span>
                            </#if>
                        </div>
                    </div>

                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="user.attributes.regon" class="${properties.kcLabelClass!}">${msg("regon")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="user.attributes.regon" class="${properties.kcInputClass!}" name="user.attributes.regon"
                                value="${(register.formData['user.attributes.regon']!'')}"
                                aria-invalid="<#if messagesPerField.existsError('user.attributes.regon')>true</#if>"
                            />
                            <#if messagesPerField.existsError('user.attributes.regon')>
                                <span id="input-error-regon" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('user.attributes.regon'))?no_esc}
                                </span>
                            </#if>
                        </div>
                    </div>

                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="user.attributes.krs" class="${properties.kcLabelClass!}">${msg("krs")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <input type="text" id="user.attributes.krs" class="${properties.kcInputClass!}" name="user.attributes.krs"
                                value="${(register.formData['user.attributes.krs']!'')}"
                                aria-invalid="<#if messagesPerField.existsError('user.attributes.krs')>true</#if>"
                            />
                            <#if messagesPerField.existsError('user.attributes.krs')>
                                <span id="input-error-krs" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('user.attributes.krs'))?no_esc}
                                </span>
                            </#if>
                        </div>
                    </div>

                    <div class="${properties.kcFormGroupClass!}">
                        <div class="${properties.kcLabelWrapperClass!}">
                            <label for="user.attributes.organization-type" class="${properties.kcLabelClass!}">${msg("organizationType")}</label>
                        </div>
                        <div class="${properties.kcInputWrapperClass!}">
                            <select id="user.attributes.organization-type" class="${properties.kcInputClass!}" name="user.attributes.organization-type" aria-invalid="<#if messagesPerField.existsError('user.attributes.organization-type')>true</#if>">
                                <option value="FOUNDATION">${msg("foundation")}</option>
                                <option value="ASSOCIATION">${msg("association")}</option>
                                <option value="SOCIAL_COOPERATIVE">${msg("social-cooperative")}</option>
                                <option value="PUBLIC_BENEFIT_ORGANIZATION">${msg("public-benefit-organization")}</option>
                                <option value="COMPANY">${msg("company")}</option>
                            </select>
                            <#if messagesPerField.existsError('user.attributes.organization-type')>
                                <span id="input-error-organization-type" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('user.attributes.organization-type'))?no_esc}
                                </span>
                            </#if>
                        </div>
                    </div>

                    <@registerCommons.termsAcceptance/>

                    <#if recaptchaRequired??>
                        <div class="form-group">
                            <div class="${properties.kcInputWrapperClass!}">
                                <div class="g-recaptcha" data-size="compact" data-sitekey="${recaptchaSiteKey}"></div>
                            </div>
                        </div>
                    </#if>

                    <div class="${properties.kcFormGroupClass!}">
                        <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
                            <div class="${properties.kcFormOptionsWrapperClass!}">
                                <span><a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                            </div>
                        </div>

                        <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                            <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doRegister")}"/>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>
