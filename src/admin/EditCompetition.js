import React, {useRef} from 'react'

export default function EditCompetition() {
    const title = useRef();
    const subTitle = useRef();
    const image = useRef();

    const handleOnSelect = (e) => {
        console.log(e);
    }
    return (
        <div>
            <h3 className="title">Edit Competition</h3>
            <select class="form-select mb-5" onClick={(e) => handleOnSelect(e.target.value)} aria-label="Default select example">
                <option selected value=''>Select Competition</option>
                <option value='RRVSS1'>RRVSS1</option>
                <option value='RRVSS2'>RRVSS2</option>
            </select>
            <form>
                <div className="form-row">
                    <label>Title</label>
                    <input type="text" ref={title} className="form-control mb-3"/>
                </div>
                <div className="form-row">
                    <label>Sub Title</label>
                    <input type="text" ref={subTitle} className="form-control mb-3"/>
                </div>
                <div className="form-row">
                    <label>Photo</label>
                    <input type="file" ref={image} className="form-control mb-3"/>
                </div>
                
                <button className="btn btn-outline-dark col-12" type="submit"><i class="fas fa-save"></i> Create</button>
                
            </form>
      
        </div>
    )
}
