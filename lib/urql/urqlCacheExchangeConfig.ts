export const cacheExchangeConfig = {
  keys: {
    chat_message_seen_by_user: () => null,
    chat_message_aggregate: () => null,
    chat_message_aggregate_fields: () => null,
    chat_room_type: (data: any) => data.name,
    stripe_subscription: () => null,
    user_chat_room: () => null,
    user_support_team: () => null,
    user_role: (data: any) => data.name,
  },
}
