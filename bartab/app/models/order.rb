class Order < ApplicationRecord
  belongs_to :patron
  belongs_to :drink
end
