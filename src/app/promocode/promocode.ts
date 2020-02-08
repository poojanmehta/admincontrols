export class promo {
  constructor(
    public pro_id: number,
    public pro_name: string,
    public pro_disc_rate: number,
    public pro_disc_flat: number,
    public pro_min_pur: number,
    public pro_max_disc: number,
    public pro_pur_type: number,
    public pro_exp_date: Date,
  ) { }
}
