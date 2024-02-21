class AddAlcoholLevelToPatron < ActiveRecord::Migration[7.0]
  def change
    add_column :patron, :body_mass, :integer
    add_column :patron, :alcohol_saturation, :double
  end
end
