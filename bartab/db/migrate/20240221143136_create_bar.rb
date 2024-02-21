class CreateBar < ActiveRecord::Migration[7.0]
  def change
    create_table :patrons do |t|
      t.string :name
      t.timestamps
    end

    create_table :drinks do |t|
      t.string :name
      t.timestamps
    end

    create_table :orders do |t|
      t.references :drink, null: false, foreign_key: true
      t.references :patron, null: false, foreign_key: true
      t.integer :amount
      t.timestamps
    end
  end
end
