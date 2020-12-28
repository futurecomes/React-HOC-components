export const basketTotalAmountCalc = (basket, allItems) =>
    basket.reduce((prev, curr) => {
        const currItem = allItems.find(availableItem => availableItem.plan_id === curr.plan_id);
        return currItem.options
            ? prev + currItem.options.find(option => option.timePeriod === curr.timePeriod).value
            : prev + currItem.value;
    }, 0);

// required because of new frontend basket implementation and old backend implementation
// all paid features and coaching packages goes to the same endpoint
const coachingPackagesDictionary = {
    growth: 'The Podcast Growth Package',
    launch: 'Podcast Launch Package',
    monetization: 'The Podcast Monetization Package',
    complete: 'The Complete Podcast Coaching Experience',
};

const bundles = ['basic', 'premium', 'ad_removal', 'embed_podcast'];

export const basketConverter = (basket, availableSubscriptions) =>
    basket.map(item =>
        bundles.reduce(
            (booleanAccumulator, currentBundleNameToCheck) =>
                item.plan_id.startsWith(currentBundleNameToCheck) || booleanAccumulator,
            false,
        )
            ? availableSubscriptions.find(
                  subscription =>
                      subscription.id.startsWith(item.plan_id) &&
                      subscription.intervalCount === parseInt(item.timePeriod),
              )
            : {
                  amount: item.plan_id === 'complete' ? 20000 : 7500,
                  basket_element: coachingPackagesDictionary[item.plan_id],
                  id: coachingPackagesDictionary[item.plan_id],
                  name: coachingPackagesDictionary[item.plan_id],
              },
    );
