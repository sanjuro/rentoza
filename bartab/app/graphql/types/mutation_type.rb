# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_drink, mutation: Mutations::CreateDrink
    field :create_order, mutation: Mutations::CreateOrder
    field :create_patron, mutation: Mutations::CreatePatron
  end
end
