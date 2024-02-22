# frozen_string_literal: true

module Types
  class OrderType < Types::BaseObject
    field :id, ID, null: false
    field :patron, PatronType, null: false
    field :drink, DrinkType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
