export function determinePlan(subscriptions = []) {
    const subscription =
        subscriptions.find(s => s.planId.startsWith('premium') || s.planId.startsWith('basic')) || {}

    if (subscription && !subscription.active) {
        return { planId: 'free' }
    }

    return {
        ...subscription,
        type: subscription.planId.replace(/:\d+$/, ''),
    }
}

export function determineSubscriptions(subscriptions = []) {
    const embedPodcastSubscription = subscriptions.find(s => s.planId.startsWith('embed_podcast'))
    return {
        plan: determinePlan(subscriptions),
        isEmbedPodcastActive: embedPodcastSubscription ? embedPodcastSubscription.active : false,
        subscriptions,
    }
}
