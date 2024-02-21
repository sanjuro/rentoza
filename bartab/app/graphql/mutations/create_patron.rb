class Mutations::CreatePatron < Mutations::BaseMutation
    argument :name, String, required: true

    field :patron, Types::PatronType, null: false
    field :errors, [String], null: false

    def resolve(name:)
      patron = Patron.new(name: name)
      if patron.save
        { patron: patron, errors: [] }
      else
        { patron: nil, errors: patrons.errors.full_messages }
      end
    end
end
