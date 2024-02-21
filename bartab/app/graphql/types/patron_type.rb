# frozen_string_literal: true

module Types
  class PatronType < Types::BaseObject

    field :id, ID, null: false
    field :name, String, null: true
    field :drinks_count, Integer, null: true

    def drinks_count
      object.drinks.size
    end
  end
end
