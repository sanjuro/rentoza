class GenerateAlcoholLevelAction < T::Struct

  def initialize(patron_id:, drink_id:)
    @patron = Patron.find(patron_id)
    @drink = Drink.find(drink_id)
  end

  def perform
    @patron.alcohol_level += @drink.alcohol_value
    @patron.save
  end
end
