class ApplicationController < ActionController::Base
end


def calculate_transfers(current_allocation, desired_allocation)

    total_current_capital = current_allocation.values.sum
    total_desired_capital = desired_allocation.values.sum
    total_transfer_amount = total_desired_capital - total_current_capital

    return {} if total_transfer_amount.zero?

    transfers = Hash.new { |hash, key| hash[key] = {} }

    current_allocation.each do |account, current_capital|
      difference = desired_allocation[account] - current_capital

      proportional_share = difference / total_transfer_amount

      desired_allocation.each do |other_account, other_desired_capital|
        next if other_account == account

        transfer_amount = proportional_share * (other_desired_capital - desired_allocation[other_account])
        transfers[account][other_account] = transfer_amount
      end
    end

    transfers
end
