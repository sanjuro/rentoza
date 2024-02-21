class Mutations::CreateOrder < Mutations::BaseMutation
    argument :patron_id, String, required: true
    argument :drink_id, String, required: true

    field :order, Types::OrderType, null: false
    field :errors, [String], null: false

    def resolve(patron_id:, drink_id:)
      order = Order.new(patron_id, drink_id)
      if order.save
        action = GenerateAlcoholLevelAction.new(patron_id, drink_id)
        action.perform

        { order: order, errors: [] }
      else
        { order: nil, errors: orders.errors.full_messages }
      end
    end
end
