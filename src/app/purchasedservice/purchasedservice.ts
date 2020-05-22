export class purchasedservice {
  constructor(
    public c_name: string,
    public fk_c_id: number,
    public fk_s_id: number,
    public fk_t_id: number,
    public s_name: string,
    public sp_id: number,
    public sp_pur_date: string,
    public sp_exp_date: string,
    public expiry?: string
  ) { }
}
