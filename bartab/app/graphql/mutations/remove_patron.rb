class Mutations::RemovePatron < Mutations::BaseMutation
    argument :id, ID, required: true

    field :errors, [String], null: false

    def resolve(id:)
      if Patron.find(id).destroy
        { errors: [] }
      else
        { patron: nil, errors: patrons.errors.full_messages }
      end
    end
end
