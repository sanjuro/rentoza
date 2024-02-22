class Mutations::CreatePatron < Mutations::BaseMutation
    argument :name, String, required: true
    argument :body_mass, Integer, required: true

    field :patron, Types::PatronType, null: false
    field :errors, [String], null: false

    def resolve(name:, body_mass:)
      patron = Patron.new(name: name, body_mass: body_mass)
      if patron.save
        { patron: patron, errors: [] }
      else
        { patron: nil, errors: patrons.errors.full_messages }
      end
    end
end
