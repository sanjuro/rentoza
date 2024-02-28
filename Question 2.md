# Question 2.2. Rebalance allocations

To solve this problem, I would calculate the difference between each desired capital allocation and the current allocation for each account. Next I would transfer funds from accounts with extra capital amounts too accounts with insufficient capital until the desired allocation is reached.

Here's a high-level outline of the algorithm:

1.  Calculate the total current capital and total desired capital.
2.  Calculate the difference between the total desired capital and the total current capital. This represents the total amount of funds that need to be transferred.
3.  Iterate over each account:

        - Calculate the difference between the desired capital and the current capital for the account.
        - Calculate the proportional share of the total transfer amount that should be allocated to this account based on its capital ratio.
        - If the difference is positive (i.e., the account has excess capital), transfer the proportional share of the total transfer amount from this account to other accounts that need funds.
        - If the difference is negative (i.e., the account needs more capital), transfer funds from other accounts to this account to reach the desired capital allocation.

        ```
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

    ````

        # Example usage:

        ```
        current_allocation = { 'Account1' => 10000, 'Account2' => 15000, 'Account3' => 20000 }
        desired_allocation = { 'Account1' => 12000, 'Account2' => 17000
        ```
    ````
