
export class Utils {
	public static formatNumberForDisplay(number: number, dp: number): string {
		if (isNaN(number) || !isFinite(number))
		{
			return new Number(0).toFixed(dp);
		} else {
			return number.toFixed(dp);
		}
	}
}