# frozen_string_literal: true

module Types
  class DrinkType < Types::BaseObject
    field :id, Integer, null: false
    field :name, String, null: false
    field :alcohol_value, Float, null: false
  end
end
