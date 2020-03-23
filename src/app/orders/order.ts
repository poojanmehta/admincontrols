export class order {
  public constructor(
    public order_id: number,
    public order_date: Date,
    public pay_type: string,
    public fk_c_id: number,
    public pro_disc?: number,
    public fk_d_id?: number
  ) { }
}
