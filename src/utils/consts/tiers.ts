
export const FREE_TIER = 'FREE_TIER';
export const STANDARD_TIER = 'STANDARD_TIER';
export const PRO_TIER = 'PRO_TIER';

const playerTiers = [
    {
        tier: FREE_TIER,
        plan_id: '',
        swingUploadsPerMonth: 100,
        analysesUploadsPerMonth: 5
    },
    {
        tier: STANDARD_TIER,
        plan_id: '',
        storageNumber: 100,
        swingUploadsPerMonth: 100,
        analysesUploadsPerMonth: 5
    },
    {
        tier: PRO_TIER,
        plan_id: '',
        storageNumber: 1000,
        swingUploadsPerMonth: 100,
        analysesUploadsPerMonth: 5
    }
];

const coachTiers = [
    {
        tier: FREE_TIER,
        plan_id: '',
        storageNumber: 10,
        uploadsPerMonth: 100,
        lessonsPerMonth: 10
    },
    {
        tier: STANDARD_TIER,
        plan_id: '',
        storageNumber: 100,
        uploadsPerMonth: 100,
        lessonsPerMonth: 10
    },
    {
        tier: PRO_TIER,
        plan_id: '',
        storageNumber: 1000,
        uploadsPerMonth: 100,
        lessonsPerMonth: 10
    }
];

export const getPlayerTierInfo = (tier) => {
    return playerTiers.find(item => item.tier === tier);
}

export const getCoachTierInfo = (tier) => {
    return coachTiers.find(item => item.tier === tier);
}
