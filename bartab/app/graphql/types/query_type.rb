# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :drinks, [Types::DrinkType], null: false

    def drinks
      Drink.all
    end

    field :drink, Types::DrinkType, null: false do
      argument :id, ID, required: true
    end

    def drink(id:)
      Drink.find(id)
    end

    field :patrons, [Types::PatronType], null: false

    def patrons
      Patron.all
    end

    field :patron, Types::PatronType, null: false do
      argument :id, ID, required: true
    end

    def patron(id:)
      Patron.find(id)
    end

    field :orders, [Types::OrderType], null: false

    def orders
      Order.all
    end

    field :order, Types::OrderType, null: false do
      argument :id, ID, required: true
    end

    def order(id:)
      Order.find(id)
    end
  end
end
