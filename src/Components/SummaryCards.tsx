export default function SummaryCards(){
    return (
        <div className="row text-center mb-4">

        <div className="col-md-4">
            <div className="card p-3 shadow-sm">
                <h4>0 ₺</h4>
                <p className="text-muted mb-0">Toplam Harcama</p>
            </div>
        </div>

        <div className="col-md-4">
            <div className="card p-3 shadow-sm">
                <h4>0</h4>
                <p className="text-muted mb-0">Toplam Kayıt</p>
            </div>
        </div>

        <div className="col-md-4">
            <div className="card p-3 shadow-sm">
                <h4>0</h4>
                <p className="text-muted mb-0">Bu Ay</p>
            </div>
        </div>

    </div>
    );
}