class AddAlcoholValueToDrink < ActiveRecord::Migration[7.0]
  def change
    add_column :drink, :alcohol_value, :double
  end
end
