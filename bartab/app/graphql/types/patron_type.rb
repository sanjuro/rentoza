# frozen_string_literal: true

module Types
  class PatronType < Types::BaseObject

    field :id, ID, null: false
    field :name, String, null: true
    field :drinks_count, Integer, null: true
    field :body_mass, Integer, null: true
    field :alcohol_saturation, Float, null: true

    def drinks_count
      object.drinks.size
    end

    def alcohol_saturation
      object.calculate_alcohol_saturation
    end
  end
end
