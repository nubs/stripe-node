declare namespace Stripe {
  /**
   * The SetupIntent object.
   */
  interface SetupIntent {
    /**
     * Unique identifier for the object.
     */
    id?: string;

    /**
     * String representing the object's type. Objects of the same type share the same value.
     */
    object?: 'setup_intent';

    /**
     * ID of the Connect application that created the SetupIntent.
     */
    application?: string | Application | null;

    /**
     * Reason for cancellation of this SetupIntent, one of `abandoned`, `requested_by_customer`, or `duplicate`.
     */
    cancellation_reason?: SetupIntent.CancellationReason | null;

    /**
     * The client secret of this SetupIntent. Used for client-side retrieval using a publishable key.
     *
     * The client secret can be used to complete payment setup from your frontend. It should not be stored, logged, embedded in URLs, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret.
     */
    client_secret?: string | null;

    /**
     * Time at which the object was created. Measured in seconds since the Unix epoch.
     */
    created?: number;

    /**
     * ID of the Customer this SetupIntent belongs to, if one exists.
     *
     * If present, payment methods used with this SetupIntent can only be attached to this Customer, and payment methods attached to other Customers cannot be used with this SetupIntent.
     */
    customer?: string | Customer | DeletedCustomer | null;

    /**
     * An arbitrary string attached to the object. Often useful for displaying to users.
     */
    description?: string | null;

    /**
     * The error encountered in the previous SetupIntent confirmation.
     */
    last_setup_error?: SetupIntent.LastSetupError | null;

    /**
     * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
     */
    livemode?: boolean;

    /**
     * ID of the multi use Mandate generated by the SetupIntent.
     */
    mandate?: string | Mandate | null;

    /**
     * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
     */
    metadata?: {
      [key: string]: string;
    };

    /**
     * If present, this property tells you what actions you need to take in order for your customer to continue payment setup.
     */
    next_action?: SetupIntent.NextAction | null;

    /**
     * The account (if any) for which the setup is intended.
     */
    on_behalf_of?: string | Account | DeletedAccount | null;

    /**
     * ID of the payment method used with this SetupIntent.
     */
    payment_method?: string | PaymentMethod | null;

    /**
     * Payment-method-specific configuration for this SetupIntent.
     */
    payment_method_options?: SetupIntent.PaymentMethodOptions | null;

    /**
     * The list of payment method types (e.g. card) that this SetupIntent is allowed to set up.
     */
    payment_method_types?: Array<string>;

    /**
     * ID of the single_use Mandate generated by the SetupIntent.
     */
    single_use_mandate?: string | Mandate | null;

    /**
     * [Status](https://stripe.com/docs/payments/intents#intent-statuses) of this SetupIntent, one of `requires_payment_method`, `requires_confirmation`, `requires_action`, `processing`, `canceled`, or `succeeded`.
     */
    status?: SetupIntent.Status;

    /**
     * Indicates how the payment method is intended to be used in the future.
     *
     * Use `on_session` if you intend to only reuse the payment method when the customer is in your checkout flow. Use `off_session` if your customer may or may not be in your checkout flow. If not provided, this value defaults to `off_session`.
     */
    usage?: string;
  }

  namespace SetupIntent {
    type CancellationReason =
      | 'abandoned'
      | 'duplicate'
      | 'requested_by_customer'

    interface LastSetupError {
      /**
       * For card errors, the ID of the failed charge.
       */
      charge?: string;

      /**
       * For some errors that could be handled programmatically, a short string indicating the [error code](https://stripe.com/docs/error-codes) reported.
       */
      code?: string;

      /**
       * For card errors resulting from a card issuer decline, a short string indicating the [card issuer's reason for the decline](https://stripe.com/docs/declines#issuer-declines) if they provide one.
       */
      decline_code?: string;

      /**
       * A URL to more information about the [error code](https://stripe.com/docs/error-codes) reported.
       */
      doc_url?: string;

      /**
       * A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.
       */
      message?: string;

      /**
       * If the error is parameter-specific, the parameter related to the error. For example, you can use this to display a message near the correct form field.
       */
      param?: string;

      payment_intent?: PaymentIntent;

      payment_method?: PaymentMethod;

      setup_intent?: SetupIntent;

      source?:
        | Account
        | AlipayAccount
        | BankAccount
        | BitcoinReceiver
        | Card
        | Source;

      /**
       * The type of error returned. One of `api_connection_error`, `api_error`, `authentication_error`, `card_error`, `idempotency_error`, `invalid_request_error`, or `rate_limit_error`
       */
      type: LastSetupError.Type;
    }

    namespace LastSetupError {
      type Type =
        | 'api_connection_error'
        | 'api_error'
        | 'authentication_error'
        | 'card_error'
        | 'idempotency_error'
        | 'invalid_request_error'
        | 'rate_limit_error'
    }

    interface NextAction {
      redirect_to_url?: NextAction.RedirectToUrl;

      /**
       * Type of the next action to perform, one of `redirect_to_url` or `use_stripe_sdk`.
       */
      type: string;

      /**
       * When confirming a SetupIntent with Stripe.js, Stripe.js depends on the contents of this dictionary to invoke authentication flows. The shape of the contents is subject to change and is only intended to be used by Stripe.js.
       */
      use_stripe_sdk?: NextAction.UseStripeSdk;
    }

    namespace NextAction {
      interface RedirectToUrl {
        /**
         * If the customer does not exit their browser while authenticating, they will be redirected to this specified URL after completion.
         */
        return_url?: string | null;

        /**
         * The URL you must redirect your customer to in order to authenticate.
         */
        url?: string | null;
      }

      interface UseStripeSdk {}
    }

    interface PaymentMethodOptions {
      card?: PaymentMethodOptions.Card;
    }

    namespace PaymentMethodOptions {
      interface Card {
        /**
         * We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://stripe.com/docs/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. Permitted values include: `automatic` or `any`. If not provided, defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://stripe.com/docs/payments/3d-secure#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
         */
        request_three_d_secure?: Card.RequestThreeDSecure | null;
      }

      namespace Card {
        type RequestThreeDSecure = 'any' | 'automatic' | 'challenge_only'
      }
    }

    type Status =
      | 'canceled'
      | 'processing'
      | 'requires_action'
      | 'requires_confirmation'
      | 'requires_payment_method'
      | 'succeeded'
  }

  /**
   * Creates a SetupIntent object.
   *
   * After the SetupIntent is created, attach a payment method and [confirm](https://stripe.com/docs/api/setup_intents/confirm)
   * to collect any required permissions to charge the payment method later.
   */
  interface SetupIntentCreateParams {
    /**
     * Set to `true` to attempt to confirm this SetupIntent immediately. This parameter defaults to `false`. If the payment method attached is a card, a return_url may be provided in case additional authentication is required.
     */
    confirm?: boolean;

    /**
     * ID of the Customer this SetupIntent belongs to, if one exists.
     *
     * If present, payment methods used with this SetupIntent can only be attached to this Customer, and payment methods attached to other Customers cannot be used with this SetupIntent.
     */
    customer?: string;

    /**
     * An arbitrary string attached to the object. Often useful for displaying to users.
     */
    description?: string;

    /**
     * Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;

    /**
     * This hash contains details about the Mandate to create. This parameter can only be used with [`confirm=true`](https://stripe.com/docs/api/setup_intents/create#create_setup_intent-confirm).
     */
    mandate_data?: SetupIntentCreateParams.MandateData;

    /**
     * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
     */
    metadata?: {
      [key: string]: string;
    };

    /**
     * The Stripe account ID for which this SetupIntent is created.
     */
    on_behalf_of?: string;

    /**
     * ID of the payment method (a PaymentMethod, Card, or saved Source object) to attach to this SetupIntent.
     */
    payment_method?: string;

    /**
     * Payment-method-specific configuration for this SetupIntent.
     */
    payment_method_options?: SetupIntentCreateParams.PaymentMethodOptions;

    /**
     * The list of payment method types (e.g. card) that this SetupIntent is allowed to use. If this is not provided, defaults to ["card"].
     */
    payment_method_types?: Array<string>;

    /**
     * The URL to redirect your customer back to after they authenticate or cancel their payment on the payment method's app or site. If you'd prefer to redirect to a mobile application, you can alternatively supply an application URI scheme. This parameter can only be used with [`confirm=true`](https://stripe.com/docs/api/setup_intents/create#create_setup_intent-confirm).
     */
    return_url?: string;

    /**
     * If this hash is populated, this SetupIntent will generate a single_use Mandate on success.
     */
    single_use?: SetupIntentCreateParams.SingleUse;

    /**
     * Indicates how the payment method is intended to be used in the future. If not provided, this value defaults to `off_session`.
     */
    usage?: string | SetupIntentCreateParams.Usage;
  }

  namespace SetupIntentCreateParams {
    interface MandateData {
      /**
       * This hash contains details about the customer acceptance of the Mandate.
       */
      customer_acceptance: MandateData.CustomerAcceptance;
    }

    namespace MandateData {
      interface CustomerAcceptance {
        /**
         * The time at which the customer accepted the Mandate.
         */
        accepted_at?: number;

        /**
         * If this is a Mandate accepted offline, this hash contains details about the offline acceptance.
         */
        offline?: CustomerAcceptance.Offline;

        /**
         * If this is a Mandate accepted online, this hash contains details about the online acceptance.
         */
        online?: CustomerAcceptance.Online;

        /**
         * The type of customer acceptance information included with the Mandate. One of `online` or `offline`.
         */
        type: CustomerAcceptance.Type;
      }

      namespace CustomerAcceptance {
        interface Offline {}

        interface Online {
          /**
           * The IP address from which the Mandate was accepted by the customer.
           */
          ip_address: string;

          /**
           * The user agent of the browser from which the Mandate was accepted by the customer.
           */
          user_agent: string;
        }

        type Type = 'offline' | 'online'
      }
    }

    interface PaymentMethodOptions {
      /**
       * Configuration for any card setup attempted on this SetupIntent.
       */
      card?: PaymentMethodOptions.Card;
    }

    namespace PaymentMethodOptions {
      interface Card {
        /**
         * When specified, this parameter signals that a card has been collected
         * as MOTO (Mail Order Telephone Order) and thus out of scope for SCA. This
         * parameter can only be provided during confirmation.
         */
        moto?: boolean;

        /**
         * We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://stripe.com/docs/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. Permitted values include: `automatic` or `any`. If not provided, defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://stripe.com/docs/payments/3d-secure#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
         */
        request_three_d_secure?: Card.RequestThreeDSecure;
      }

      namespace Card {
        type RequestThreeDSecure = 'any' | 'automatic'
      }
    }

    interface SingleUse {
      /**
       * Amount intended to be collected by this PaymentIntent. A positive integer representing how much to charge in the [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).
       */
      amount: number;

      /**
       * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
       */
      currency: string;
    }

    type Usage = 'off_session' | 'on_session'
  }

  /**
   * Retrieves the details of a SetupIntent that has previously been created.
   *
   * Client-side retrieval using a publishable key is allowed when the client_secret is provided in the query string.
   *
   * When retrieved with a publishable key, only a subset of properties will be returned. Please refer to the [SetupIntent](https://stripe.com/docs/api#setup_intent_object) object reference for more details.
   */
  interface SetupIntentRetrieveParams {
    /**
     * The client secret of the SetupIntent. Required if a publishable key is used to retrieve the SetupIntent.
     */
    client_secret?: string;

    /**
     * Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;
  }

  /**
   * Updates a SetupIntent object.
   */
  interface SetupIntentUpdateParams {
    /**
     * ID of the Customer this SetupIntent belongs to, if one exists.
     *
     * If present, payment methods used with this SetupIntent can only be attached to this Customer, and payment methods attached to other Customers cannot be used with this SetupIntent.
     */
    customer?: string;

    /**
     * An arbitrary string attached to the object. Often useful for displaying to users.
     */
    description?: string;

    /**
     * Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;

    /**
     * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
     */
    metadata?: {
      [key: string]: string;
    };

    /**
     * ID of the payment method (a PaymentMethod, Card, or saved Source object) to attach to this SetupIntent.
     */
    payment_method?: string;

    /**
     * The list of payment method types (e.g. card) that this SetupIntent is allowed to set up. If this is not provided, defaults to ["card"].
     */
    payment_method_types?: Array<string>;
  }

  /**
   * Returns a list of SetupIntents.
   */
  interface SetupIntentListParams {
    /**
     * A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.
     */
    created?: number | SetupIntentListParams.Created;

    /**
     * Only return SetupIntents for the customer specified by this customer ID.
     */
    customer?: string;

    /**
     * A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
     */
    ending_before?: string;

    /**
     * Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;

    /**
     * A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
     */
    limit?: number;

    /**
     * Only return SetupIntents associated with the specified payment method.
     */
    payment_method?: string;

    /**
     * A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
     */
    starting_after?: string;
  }

  namespace SetupIntentListParams {
    interface Created {
      /**
       * Minimum value to filter by (exclusive)
       */
      gt?: number;

      /**
       * Minimum value to filter by (inclusive)
       */
      gte?: number;

      /**
       * Maximum value to filter by (exclusive)
       */
      lt?: number;

      /**
       * Maximum value to filter by (inclusive)
       */
      lte?: number;
    }
  }

  /**
   * A SetupIntent object can be canceled when it is in one of these statuses: requires_payment_method, requires_capture, requires_confirmation, requires_action.
   *
   * Once canceled, setup is abandoned and any operations on the SetupIntent will fail with an error.
   */
  interface SetupIntentCancelParams {
    /**
     * Reason for canceling this SetupIntent. Possible values are `abandoned`, `requested_by_customer`, or `duplicate`
     */
    cancellation_reason?: SetupIntentCancelParams.CancellationReason;

    /**
     * Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;
  }

  namespace SetupIntentCancelParams {
    type CancellationReason =
      | 'abandoned'
      | 'duplicate'
      | 'requested_by_customer'
  }

  /**
   * Confirm that your customer intends to set up the current or
   * provided payment method. For example, you would confirm a SetupIntent
   * when a customer hits the “Save” button on a payment method management
   * page on your website.
   *
   * If the selected payment method does not require any additional
   * steps from the customer, the SetupIntent will transition to the
   * succeeded status.
   *
   * Otherwise, it will transition to the requires_action status and
   * suggest additional actions via next_action. If setup fails,
   * the SetupIntent will transition to the
   * requires_payment_method status.
   */
  interface SetupIntentConfirmParams {
    /**
     * Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;

    /**
     * This hash contains details about the Mandate to create
     */
    mandate_data?:
      | SetupIntentConfirmParams.MandateData1
      | SetupIntentConfirmParams.MandateData2;

    /**
     * ID of the payment method (a PaymentMethod, Card, or saved Source object) to attach to this SetupIntent.
     */
    payment_method?: string;

    /**
     * Payment-method-specific configuration for this SetupIntent.
     */
    payment_method_options?: SetupIntentConfirmParams.PaymentMethodOptions;

    /**
     * The URL to redirect your customer back to after they authenticate on the payment method's app or site.
     * If you'd prefer to redirect to a mobile application, you can alternatively supply an application URI scheme.
     * This parameter is only used for cards and other redirect-based payment methods.
     */
    return_url?: string;
  }

  namespace SetupIntentConfirmParams {
    interface MandateData1 {
      /**
       * This hash contains details about the customer acceptance of the Mandate.
       */
      customer_acceptance: MandateData1.CustomerAcceptance;
    }

    namespace MandateData1 {
      interface CustomerAcceptance {
        /**
         * The time at which the customer accepted the Mandate.
         */
        accepted_at?: number;

        /**
         * If this is a Mandate accepted offline, this hash contains details about the offline acceptance.
         */
        offline?: CustomerAcceptance.Offline;

        /**
         * If this is a Mandate accepted online, this hash contains details about the online acceptance.
         */
        online?: CustomerAcceptance.Online;

        /**
         * The type of customer acceptance information included with the Mandate. One of `online` or `offline`.
         */
        type: CustomerAcceptance.Type;
      }

      namespace CustomerAcceptance {
        interface Offline {}

        interface Online {
          /**
           * The IP address from which the Mandate was accepted by the customer.
           */
          ip_address: string;

          /**
           * The user agent of the browser from which the Mandate was accepted by the customer.
           */
          user_agent: string;
        }

        type Type = 'offline' | 'online'
      }
    }
    interface MandateData2 {
      /**
       * This hash contains details about the customer acceptance of the Mandate.
       */
      customer_acceptance: MandateData2.CustomerAcceptance;
    }

    namespace MandateData2 {
      interface CustomerAcceptance {
        /**
         * If this is a Mandate accepted online, this hash contains details about the online acceptance.
         */
        online: CustomerAcceptance.Online;

        /**
         * The type of customer acceptance information included with the Mandate.
         */
        type: 'online';
      }

      namespace CustomerAcceptance {
        interface Online {
          /**
           * The IP address from which the Mandate was accepted by the customer.
           */
          ip_address?: string;

          /**
           * The user agent of the browser from which the Mandate was accepted by the customer.
           */
          user_agent?: string;
        }
      }
    }

    interface PaymentMethodOptions {
      /**
       * Configuration for any card setup attempted on this SetupIntent.
       */
      card?: PaymentMethodOptions.Card;
    }

    namespace PaymentMethodOptions {
      interface Card {
        /**
         * When specified, this parameter signals that a card has been collected
         * as MOTO (Mail Order Telephone Order) and thus out of scope for SCA. This
         * parameter can only be provided during confirmation.
         */
        moto?: boolean;

        /**
         * We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://stripe.com/docs/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. Permitted values include: `automatic` or `any`. If not provided, defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://stripe.com/docs/payments/3d-secure#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
         */
        request_three_d_secure?: Card.RequestThreeDSecure;
      }

      namespace Card {
        type RequestThreeDSecure = 'any' | 'automatic'
      }
    }
  }

  class SetupIntentsResource {
    /**
     * Creates a SetupIntent object.
     *
     * After the SetupIntent is created, attach a payment method and [confirm](https://stripe.com/docs/api/setup_intents/confirm)
     * to collect any required permissions to charge the payment method later.
     */
    create(
      params?: SetupIntentCreateParams,
      options?: RequestOptions
    ): Promise<SetupIntent>;
    create(options?: RequestOptions): Promise<SetupIntent>;

    /**
     * Retrieves the details of a SetupIntent that has previously been created.
     *
     * Client-side retrieval using a publishable key is allowed when the client_secret is provided in the query string.
     *
     * When retrieved with a publishable key, only a subset of properties will be returned. Please refer to the [SetupIntent](https://stripe.com/docs/api#setup_intent_object) object reference for more details.
     */
    retrieve(
      id: string,
      params?: SetupIntentRetrieveParams,
      options?: RequestOptions
    ): Promise<SetupIntent>;
    retrieve(id: string, options?: RequestOptions): Promise<SetupIntent>;

    /**
     * Updates a SetupIntent object.
     */
    update(
      id: string,
      params?: SetupIntentUpdateParams,
      options?: RequestOptions
    ): Promise<SetupIntent>;

    /**
     * Returns a list of SetupIntents.
     */
    list(
      params?: SetupIntentListParams,
      options?: RequestOptions
    ): ApiListPromise<SetupIntent>;
    list(options?: RequestOptions): ApiListPromise<SetupIntent>;

    /**
     * A SetupIntent object can be canceled when it is in one of these statuses: requires_payment_method, requires_capture, requires_confirmation, requires_action.
     *
     * Once canceled, setup is abandoned and any operations on the SetupIntent will fail with an error.
     */
    cancel(
      id: string,
      params?: SetupIntentCancelParams,
      options?: RequestOptions
    ): Promise<SetupIntent>;
    cancel(id: string, options?: RequestOptions): Promise<SetupIntent>;

    /**
     * Confirm that your customer intends to set up the current or
     * provided payment method. For example, you would confirm a SetupIntent
     * when a customer hits the “Save” button on a payment method management
     * page on your website.
     *
     * If the selected payment method does not require any additional
     * steps from the customer, the SetupIntent will transition to the
     * succeeded status.
     *
     * Otherwise, it will transition to the requires_action status and
     * suggest additional actions via next_action. If setup fails,
     * the SetupIntent will transition to the
     * requires_payment_method status.
     */
    confirm(
      id: string,
      params?: SetupIntentConfirmParams,
      options?: RequestOptions
    ): Promise<SetupIntent>;
    confirm(id: string, options?: RequestOptions): Promise<SetupIntent>;
  }
}