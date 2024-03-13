# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


# db/seeds.rb

# Define the initial data for drinks
drinks_data = [
  { name: 'Vodka Martini', alcohol_value: 0.05 },
  { name: 'Long Island Iced Tea', alcohol_value: 0.01 },
  { name: 'Whiskey', alcohol_value: 0.09 },
  # Add more drink data as needed
]

# Create drinks records
drinks_data.each do |drink_data|
  Drink.create(drink_data)
end
