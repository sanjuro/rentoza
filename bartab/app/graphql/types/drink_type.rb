# frozen_string_literal: true

module Types
  class DrinkType < Types::BaseObject
    field :id, Integer, null: false
    field :title, String, null: false
  end
end
