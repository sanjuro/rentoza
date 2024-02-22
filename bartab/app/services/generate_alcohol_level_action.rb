class GenerateAlcoholLevelAction

  def initialize(patron_id, drink_id)
    @patron = Patron.find(patron_id)
    @drink = Drink.find(drink_id)
  end

  def perform
    @patron.alcohol_saturation = @patron.calculate_alcohol_saturation
    @patron.save
  end
end
