class Mutations::CreateOrder < Mutations::BaseMutation
    argument :patron_id, Integer, required: true
    argument :drink_id, Integer, required: true

    field :order, Types::OrderType, null: false
    field :errors, [String], null: false

    def resolve(patron_id:, drink_id:)
      order = Order.new(patron_id: patron_id, drink_id: drink_id)
      if order.save
        action = GenerateAlcoholLevelAction.new(patron_id, drink_id)
        action.perform

        { order: order, errors: [] }
      else
        { order: nil, errors: order.errors.full_messages }
      end
    end
end
