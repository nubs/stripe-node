declare namespace Stripe {
  /**
   * The SubscriptionSchedule object.
   */
  interface SubscriptionSchedule {
    /**
     * Time at which the subscription schedule was canceled. Measured in seconds since the Unix epoch.
     */
    canceled_at?: number | null;

    /**
     * Time at which the subscription schedule was completed. Measured in seconds since the Unix epoch.
     */
    completed_at?: number | null;

    /**
     * Time at which the object was created. Measured in seconds since the Unix epoch.
     */
    created?: number;

    /**
     * Object representing the start and end dates for the current phase of the subscription schedule, if it is `active`.
     */
    current_phase?: CurrentPhase | null;

    /**
     * ID of the customer who owns the subscription schedule.
     */
    customer?: string | Customer;

    default_settings?: DefaultSettings;

    /**
     * Behavior of the subscription schedule and underlying subscription when it ends.
     */
    end_behavior?: SubscriptionSchedule.EndBehavior;

    /**
     * Unique identifier for the object.
     */
    id?: string;

    /**
     * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
     */
    livemode?: boolean;

    /**
     * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
     */
    metadata?:
      | {
        [key: string]: string;
      }
      | null;

    /**
     * String representing the object's type. Objects of the same type share the same value.
     */
    object?: 'subscription_schedule';

    /**
     * Configuration for the subscription schedule's phases.
     */
    phases?: Array<Phase>;

    /**
     * Time at which the subscription schedule was released. Measured in seconds since the Unix epoch.
     */
    released_at?: number | null;

    /**
     * ID of the subscription once managed by the subscription schedule (if it is released).
     */
    released_subscription?: string | null;

    /**
     * This field has been deprecated. Interval and duration at which the subscription schedule renews for when it ends if `renewal_behavior` is `renew`.
     */
    renewal_interval?: RenewalInterval | null;

    /**
     * The present status of the subscription schedule. Possible values are `not_started`, `active`, `completed`, `released`, and `canceled`. You can read more about the different states in our [behavior guide](https://stripe.com/docs/billing/subscriptions/subscription-schedules).
     */
    status?: SubscriptionSchedule.Status;

    /**
     * ID of the subscription managed by the subscription schedule.
     */
    subscription?: string | Subscription | null;
  }

  namespace SubscriptionSchedule {
    type EndBehavior = 'cancel' | 'none' | 'release' | 'renew'

    type Status =
      | 'active'
      | 'canceled'
      | 'completed'
      | 'not_started'
      | 'released'
  }

  /**
   * Creates a new subscription schedule object.
   */
  interface SubscriptionScheduleCreateParams {
    /**
     * The identifier of the customer to create the subscription schedule for.
     */
    customer?: string;

    /**
     * Object representing the subscription schedule's default settings.
     */
    default_settings?: SubscriptionScheduleCreateParams.DefaultSettings;

    /**
     * Configures how the subscription schedule behaves when it ends. Possible values are `release` or `cancel` with the default being `release`. `release` will end the subscription schedule and keep the underlying subscription running.`cancel` will end the subscription schedule and cancel the underlying subscription.
     */
    end_behavior?: SubscriptionScheduleCreateParams.EndBehavior;

    /**
     * Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;

    /**
     * Migrate an existing subscription to be managed by a subscription schedule. If this parameter is set, a subscription schedule will be created using the subscription's plan(s), set to auto-renew using the subscription's interval. When using this parameter, other parameters (such as phase values) cannot be set. To create a subscription schedule with other modifications, we recommend making two separate API calls.
     */
    from_subscription?: string;

    /**
     * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
     */
    metadata?: {
      [key: string]: string;
    };

    /**
     * List representing phases of the subscription schedule. Each phase can be customized to have different durations, plans, and coupons. If there are multiple phases, the `end_date` of one phase will always equal the `start_date` of the next phase.
     */
    phases?: Array<SubscriptionScheduleCreateParams.Phase>;

    /**
     * When the subscription schedule starts. We recommend using `now` so that it starts the subscription immediately. You can also use a Unix timestamp to backdate the subscription so that it starts on a past date, or set a future date for the subscription to start on. When you backdate, the `billing_cycle_anchor` of the subscription is equivalent to the `start_date`.
     */
    start_date?: number | 'now';
  }

  namespace SubscriptionScheduleCreateParams {
    interface DefaultSettings {
      /**
       * Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period. Pass an empty string to remove previously-defined thresholds.
       */
      billing_thresholds?: '' | DefaultSettings.BillingThresholds;

      /**
       * Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay the underlying subscription at the end of each billing cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions. Defaults to `charge_automatically` on creation.
       */
      collection_method?: DefaultSettings.CollectionMethod;

      /**
       * ID of the default payment method for the subscription schedule. It must belong to the customer associated with the subscription schedule. If not set, invoices will use the default payment method in the customer's invoice settings.
       */
      default_payment_method?: string;

      /**
       * All invoices will be billed using the specified settings.
       */
      invoice_settings?: DefaultSettings.InvoiceSettings;
    }

    namespace DefaultSettings {
      interface BillingThresholds {
        /**
         * Monetary threshold that triggers the subscription to advance to a new billing period
         */
        amount_gte?: number;

        /**
         * Indicates if the `billing_cycle_anchor` should be reset when a threshold is reached. If true, `billing_cycle_anchor` will be updated to the date/time the threshold was last reached; otherwise, the value will remain unchanged.
         */
        reset_billing_cycle_anchor?: boolean;
      }

      type CollectionMethod = 'charge_automatically' | 'send_invoice'

      interface InvoiceSettings {
        days_until_due?: number;
      }
    }

    type EndBehavior = 'cancel' | 'none' | 'release' | 'renew'

    interface Phase {
      /**
       * A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice subtotal that will be transferred to the application owner's Stripe account. The request must be made by a platform account on a connected account in order to set an application fee percentage. For more information, see the application fees [documentation](https://stripe.com/docs/connect/subscriptions#collecting-fees-on-subscriptions).
       */
      application_fee_percent?: number;

      /**
       * Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period. Pass an empty string to remove previously-defined thresholds.
       */
      billing_thresholds?: '' | Phase.BillingThresholds;

      /**
       * Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay the underlying subscription at the end of each billing cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions. Defaults to `charge_automatically` on creation.
       */
      collection_method?: Phase.CollectionMethod;

      /**
       * The identifier of the coupon to apply to this phase of the subscription schedule.
       */
      coupon?: string;

      /**
       * ID of the default payment method for the subscription schedule. It must belong to the customer associated with the subscription schedule. If not set, invoices will use the default payment method in the customer's invoice settings.
       */
      default_payment_method?: string;

      /**
       * A list of [Tax Rate](https://stripe.com/docs/api/tax_rates) ids. These Tax Rates will set the Subscription's [`default_tax_rates`](https://stripe.com/docs/api/subscriptions/create#create_subscription-default_tax_rates), which means they will be the Invoice's [`default_tax_rates`](https://stripe.com/docs/api/invoices/create#create_invoice-default_tax_rates) for any Invoices issued by the Subscription during this Phase. When updating, pass an empty string to remove previously-defined tax rates.
       */
      default_tax_rates?: Array<string> | '';

      /**
       * The date at which this phase of the subscription schedule ends. If set, `iterations` must not be set.
       */
      end_date?: number;

      /**
       * All invoices will be billed using the specified settings.
       */
      invoice_settings?: Phase.InvoiceSettings;

      /**
       * Integer representing the multiplier applied to the plan interval. For example, `iterations=2` applied to a plan with `interval=month` and `interval_count=3` results in a phase of duration `2 * 3 months = 6 months`. If set, `end_date` must not be set.
       */
      iterations?: number;

      /**
       * List of configuration items, each with an attached plan, to apply during this phase of the subscription schedule.
       */
      plans: Array<Phase.Plan>;

      /**
       * A non-negative decimal (with at most four decimal places) between 0 and 100. This represents the percentage of the subscription invoice subtotal that will be calculated and added as tax to the final amount in each billing period during thise phase of the schedule. For example, a plan which charges $10/month with a `tax_percent` of `20.0` will charge $12 per invoice. To unset a previously-set value, pass an empty string. This field has been deprecated and will be removed in a future API version, for further information view the [migration docs](https://stripe.com/docs/billing/migration/taxes) for `tax_rates`.
       */
      tax_percent?: number;

      /**
       * If set to true the entire phase is counted as a trial and the customer will not be charged for any fees.
       */
      trial?: boolean;

      /**
       * Sets the phase to trialing from the start date to this date. Must be before the phase end date, can not be combined with `trial`
       */
      trial_end?: number;
    }

    namespace Phase {
      interface BillingThresholds {
        /**
         * Monetary threshold that triggers the subscription to advance to a new billing period
         */
        amount_gte?: number;

        /**
         * Indicates if the `billing_cycle_anchor` should be reset when a threshold is reached. If true, `billing_cycle_anchor` will be updated to the date/time the threshold was last reached; otherwise, the value will remain unchanged.
         */
        reset_billing_cycle_anchor?: boolean;
      }

      type CollectionMethod = 'charge_automatically' | 'send_invoice'

      interface InvoiceSettings {
        days_until_due?: number;
      }

      interface Plan {
        /**
         * Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period. When updating, pass an empty string to remove previously-defined thresholds.
         */
        billing_thresholds?: '' | Plan.BillingThresholds;

        /**
         * The plan ID to subscribe to.
         */
        plan: string;

        /**
         * Quantity for the given plan. Can be set only if the plan's `usage_type` is `licensed` and not `metered`.
         */
        quantity?: number;

        /**
         * A list of [Tax Rate](https://stripe.com/docs/api/tax_rates) ids. These Tax Rates will override the [`default_tax_rates`](https://stripe.com/docs/api/subscriptions/create#create_subscription-default_tax_rates) on the Subscription. When updating, pass an empty string to remove previously-defined tax rates.
         */
        tax_rates?: Array<string> | '';
      }

      namespace Plan {
        interface BillingThresholds {
          /**
           * Usage threshold that triggers the subscription to advance to a new billing period
           */
          usage_gte: number;
        }
      }
    }
  }

  /**
   * Retrieves the list of your subscription schedules.
   */
  interface SubscriptionScheduleListParams {
    /**
     * Only return subscription schedules that were created canceled the given date interval.
     */
    canceled_at?: number | SubscriptionScheduleListParams.CanceledAt;

    /**
     * Only return subscription schedules that completed during the given date interval.
     */
    completed_at?: number | SubscriptionScheduleListParams.CompletedAt;

    /**
     * Only return subscription schedules that were created during the given date interval.
     */
    created?: number | SubscriptionScheduleListParams.Created;

    /**
     * Only return subscription schedules for the given customer.
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
     * Only return subscription schedules that were released during the given date interval.
     */
    released_at?: number | SubscriptionScheduleListParams.ReleasedAt;

    /**
     * Only return subscription schedules that have not started yet.
     */
    scheduled?: boolean;

    /**
     * A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
     */
    starting_after?: string;
  }

  namespace SubscriptionScheduleListParams {
    interface CanceledAt {
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

    interface CompletedAt {
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

    interface ReleasedAt {
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
   * Retrieves the details of an existing subscription schedule. You only need to supply the unique subscription schedule identifier that was returned upon subscription schedule creation.
   */
  interface SubscriptionScheduleRetrieveParams {
    /**
     * Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;
  }

  /**
   * Updates an existing subscription schedule.
   */
  interface SubscriptionScheduleUpdateParams {
    /**
     * Object representing the subscription schedule's default settings.
     */
    default_settings?: SubscriptionScheduleUpdateParams.DefaultSettings;

    /**
     * Configures how the subscription schedule behaves when it ends. Possible values are `release` or `cancel` with the default being `release`. `release` will end the subscription schedule and keep the underlying subscription running.`cancel` will end the subscription schedule and cancel the underlying subscription.
     */
    end_behavior?: SubscriptionScheduleUpdateParams.EndBehavior;

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
     * List representing phases of the subscription schedule. Each phase can be customized to have different durations, plans, and coupons. If there are multiple phases, the `end_date` of one phase will always equal the `start_date` of the next phase. Note that past phases can be omitted.
     */
    phases?: Array<SubscriptionScheduleUpdateParams.Phase>;

    /**
     * If the update changes the current phase, indicates if the changes should be prorated. Defaults to `true`.
     */
    prorate?: boolean;
  }

  namespace SubscriptionScheduleUpdateParams {
    interface DefaultSettings {
      /**
       * Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period. Pass an empty string to remove previously-defined thresholds.
       */
      billing_thresholds?: '' | DefaultSettings.BillingThresholds;

      /**
       * Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay the underlying subscription at the end of each billing cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions. Defaults to `charge_automatically` on creation.
       */
      collection_method?: DefaultSettings.CollectionMethod;

      /**
       * ID of the default payment method for the subscription schedule. It must belong to the customer associated with the subscription schedule. If not set, invoices will use the default payment method in the customer's invoice settings.
       */
      default_payment_method?: string;

      /**
       * All invoices will be billed using the specified settings.
       */
      invoice_settings?: DefaultSettings.InvoiceSettings;
    }

    namespace DefaultSettings {
      interface BillingThresholds {
        /**
         * Monetary threshold that triggers the subscription to advance to a new billing period
         */
        amount_gte?: number;

        /**
         * Indicates if the `billing_cycle_anchor` should be reset when a threshold is reached. If true, `billing_cycle_anchor` will be updated to the date/time the threshold was last reached; otherwise, the value will remain unchanged.
         */
        reset_billing_cycle_anchor?: boolean;
      }

      type CollectionMethod = 'charge_automatically' | 'send_invoice'

      interface InvoiceSettings {
        days_until_due?: number;
      }
    }

    type EndBehavior = 'cancel' | 'none' | 'release' | 'renew'

    interface Phase {
      /**
       * A non-negative decimal between 0 and 100, with at most two decimal places. This represents the percentage of the subscription invoice subtotal that will be transferred to the application owner's Stripe account. The request must be made by a platform account on a connected account in order to set an application fee percentage. For more information, see the application fees [documentation](https://stripe.com/docs/connect/subscriptions#collecting-fees-on-subscriptions).
       */
      application_fee_percent?: number;

      /**
       * Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period. Pass an empty string to remove previously-defined thresholds.
       */
      billing_thresholds?: '' | Phase.BillingThresholds;

      /**
       * Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will attempt to pay the underlying subscription at the end of each billing cycle using the default source attached to the customer. When sending an invoice, Stripe will email your customer an invoice with payment instructions. Defaults to `charge_automatically` on creation.
       */
      collection_method?: Phase.CollectionMethod;

      /**
       * The identifier of the coupon to apply to this phase of the subscription schedule.
       */
      coupon?: string;

      /**
       * ID of the default payment method for the subscription schedule. It must belong to the customer associated with the subscription schedule. If not set, invoices will use the default payment method in the customer's invoice settings.
       */
      default_payment_method?: string;

      /**
       * A list of [Tax Rate](https://stripe.com/docs/api/tax_rates) ids. These Tax Rates will set the Subscription's [`default_tax_rates`](https://stripe.com/docs/api/subscriptions/create#create_subscription-default_tax_rates), which means they will be the Invoice's [`default_tax_rates`](https://stripe.com/docs/api/invoices/create#create_invoice-default_tax_rates) for any Invoices issued by the Subscription during this Phase. When updating, pass an empty string to remove previously-defined tax rates.
       */
      default_tax_rates?: Array<string> | '';

      /**
       * The date at which this phase of the subscription schedule ends. If set, `iterations` must not be set.
       */
      end_date?: number | 'now';

      /**
       * All invoices will be billed using the specified settings.
       */
      invoice_settings?: Phase.InvoiceSettings;

      /**
       * Integer representing the multiplier applied to the plan interval. For example, `iterations=2` applied to a plan with `interval=month` and `interval_count=3` results in a phase of duration `2 * 3 months = 6 months`. If set, `end_date` must not be set.
       */
      iterations?: number;

      /**
       * List of configuration items, each with an attached plan, to apply during this phase of the subscription schedule.
       */
      plans: Array<Phase.Plan>;

      /**
       * The date at which this phase of the subscription schedule starts or `now`. Must be set on the first phase.
       */
      start_date?: number | 'now';

      /**
       * A non-negative decimal (with at most four decimal places) between 0 and 100. This represents the percentage of the subscription invoice subtotal that will be calculated and added as tax to the final amount in each billing period during thise phase of the schedule. For example, a plan which charges $10/month with a `tax_percent` of `20.0` will charge $12 per invoice. To unset a previously-set value, pass an empty string. This field has been deprecated and will be removed in a future API version, for further information view the [migration docs](https://stripe.com/docs/billing/migration/taxes) for `tax_rates`.
       */
      tax_percent?: number;

      /**
       * If set to true the entire phase is counted as a trial and the customer will not be charged for any fees.
       */
      trial?: boolean;

      /**
       * Sets the phase to trialing from the start date to this date. Must be before the phase end date, can not be combined with `trial`
       */
      trial_end?: number | 'now';
    }

    namespace Phase {
      interface BillingThresholds {
        /**
         * Monetary threshold that triggers the subscription to advance to a new billing period
         */
        amount_gte?: number;

        /**
         * Indicates if the `billing_cycle_anchor` should be reset when a threshold is reached. If true, `billing_cycle_anchor` will be updated to the date/time the threshold was last reached; otherwise, the value will remain unchanged.
         */
        reset_billing_cycle_anchor?: boolean;
      }

      type CollectionMethod = 'charge_automatically' | 'send_invoice'

      interface InvoiceSettings {
        days_until_due?: number;
      }

      interface Plan {
        /**
         * Define thresholds at which an invoice will be sent, and the subscription advanced to a new billing period. When updating, pass an empty string to remove previously-defined thresholds.
         */
        billing_thresholds?: '' | Plan.BillingThresholds;

        /**
         * The plan ID to subscribe to.
         */
        plan: string;

        /**
         * Quantity for the given plan. Can be set only if the plan's `usage_type` is `licensed` and not `metered`.
         */
        quantity?: number;

        /**
         * A list of [Tax Rate](https://stripe.com/docs/api/tax_rates) ids. These Tax Rates will override the [`default_tax_rates`](https://stripe.com/docs/api/subscriptions/create#create_subscription-default_tax_rates) on the Subscription. When updating, pass an empty string to remove previously-defined tax rates.
         */
        tax_rates?: Array<string> | '';
      }

      namespace Plan {
        interface BillingThresholds {
          /**
           * Usage threshold that triggers the subscription to advance to a new billing period
           */
          usage_gte: number;
        }
      }
    }
  }

  /**
   * Cancels a subscription schedule and its associated subscription immediately (if the subscription schedule has an active subscription). A subscription schedule can only be canceled if its status is not_started or active.
   */
  interface SubscriptionScheduleCancelParams {
    /**
     * Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;

    /**
     * If the subscription schedule is `active`, indicates whether or not to generate a final invoice that contains any un-invoiced metered usage and new/pending proration invoice items. Defaults to `true`.
     */
    invoice_now?: boolean;

    /**
     * If the subscription schedule is `active`, indicates if the cancellation should be prorated. Defaults to `true`.
     */
    prorate?: boolean;
  }

  /**
   * Releases the subscription schedule immediately, which will stop scheduling of its phases, but leave any existing subscription in place. A schedule can only be released if its status is not_started or active. If the subscription schedule is currently associated with a subscription, releasing it will remove its subscription property and set the subscription's ID to the released_subscription property.
   */
  interface SubscriptionScheduleReleaseParams {
    /**
     * Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;

    /**
     * Keep any cancellation on the subscription that the schedule has set
     */
    preserve_cancel_date?: boolean;
  }

  class SubscriptionSchedulesResource {
    /**
     * Creates a new subscription schedule object.
     */
    create(
      params?: SubscriptionScheduleCreateParams,
      options?: HeaderOptions
    ): Promise<SubscriptionSchedule>;

    /**
     * Retrieves the list of your subscription schedules.
     */
    list(
      params?: SubscriptionScheduleListParams,
      options?: HeaderOptions
    ): Promise<ApiList<SubscriptionSchedule>>;

    /**
     * Retrieves the details of an existing subscription schedule. You only need to supply the unique subscription schedule identifier that was returned upon subscription schedule creation.
     */
    retrieve(
      id: string,
      params?: SubscriptionScheduleRetrieveParams,
      options?: HeaderOptions
    ): Promise<SubscriptionSchedule>;

    /**
     * Updates an existing subscription schedule.
     */
    update(
      id: string,
      params?: SubscriptionScheduleUpdateParams,
      options?: HeaderOptions
    ): Promise<SubscriptionSchedule>;

    /**
     * Cancels a subscription schedule and its associated subscription immediately (if the subscription schedule has an active subscription). A subscription schedule can only be canceled if its status is not_started or active.
     */
    cancel(
      id: string,
      params?: SubscriptionScheduleCancelParams,
      options?: HeaderOptions
    ): Promise<SubscriptionSchedule>;

    /**
     * Releases the subscription schedule immediately, which will stop scheduling of its phases, but leave any existing subscription in place. A schedule can only be released if its status is not_started or active. If the subscription schedule is currently associated with a subscription, releasing it will remove its subscription property and set the subscription's ID to the released_subscription property.
     */
    release(
      id: string,
      params?: SubscriptionScheduleReleaseParams,
      options?: HeaderOptions
    ): Promise<SubscriptionSchedule>;
  }
}