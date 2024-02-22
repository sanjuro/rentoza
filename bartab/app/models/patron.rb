class Patron < ApplicationRecord
  has_many :orders
  has_many :drinks, through: :orders

  def calculate_alcohol_saturation
    alcohol_consumed = drinks.all.map { |drink| drink.alcohol_value }.sum
    saturation = alcohol_consumed.to_f / body_mass.to_f
    saturation /= time_since_last_drink.to_f
    saturation
  end

  private

  def time_since_last_drink
    last_order = orders.last
    return 0 unless last_order

    (Time.now - last_order.created_at) / 1.hour
  end
end
