class AddAlcoholLevelToPatron < ActiveRecord::Migration[7.0]
  def change
    add_column :patrons, :body_mass, :integer
    add_column :patrons, :alcohol_saturation, :decimal
  end
end
