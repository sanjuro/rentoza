class Patron < ApplicationRecord
  has_many :orders
  has_many :drinks, through: :orders

  def calculate_saturation
    saturation = alcohol_consumed.to_f / body_mass.to_f
    saturation /= time_since_last_drink.to_f
    saturation = saturate(saturation)
    saturation
  end

  private

  def saturate(saturation)
    saturation * Math.exp(-time_since_last_drink.to_f / 10)
  end
end
