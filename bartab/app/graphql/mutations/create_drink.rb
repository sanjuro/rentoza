class Mutations::CreateDrink < Mutations::BaseMutation
    argument :name, String, required: true
    argument :alcohol_value, Float, required: true

    field :drink, Types::DrinkType, null: false
    field :errors, [String], null: false

    def resolve(name:, alcohol_value:)
      drink = Drink.new(name: name, alcohol_value: alcohol_value)
      if drink.save
        { drink: drink, errors: [] }
      else
        { drink: nil, errors: drinks.errors.full_messages }
      end
    end
end
