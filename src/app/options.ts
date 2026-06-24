export const sizes = {
    PAIR_CHART_HEIGHT: 400,
    // PairChartWidth: 100,
}as const
export const INTERVALS = ["15m","1h", "4h", "1d"] as const
export type Interval = typeof INTERVALS[number]