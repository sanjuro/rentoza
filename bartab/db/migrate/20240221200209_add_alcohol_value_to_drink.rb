class AddAlcoholValueToDrink < ActiveRecord::Migration[7.0]
  def change
    add_column :drinks, :alcohol_value, :decimal
  end
end
