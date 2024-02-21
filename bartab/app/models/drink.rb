class Drink < ApplicationRecord
  has_many :orders
  has_many :patrons, through: :orders
end
