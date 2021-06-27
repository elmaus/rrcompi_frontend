import React, {useRef} from 'react'

export default function AddMember() {
    const name = useRef('');
    const title = useRef('');
    const location = useRef('');
    const genre = useRef('');
    const file = useRef('');


    return (
        <div>
            <h3 className="title">Add New Member</h3>

            <form>
                <div className="form-row mb-3">
                    <label>Name</label>
                    <input type="text" ref={name} className="form-control"/>
                </div>
                <div className="form-row mb-3">
                    <label>Title</label>
                    <input type="text" ref={title} className="form-control"/>
                </div>
                <div className="form-row mb-3">
                    <label>Location</label>
                    <input type="text" ref={location} className="form-control"/>
                </div>
                <div className="form-row mb-3">
                    <label className="form-label">Genre</label>
                    
                    <div className="col-12">
                        <select class="form-select" ref={genre} aria-label="Default select example">
                            <option value="Love Song">Love Song</option>
                            <option value="Rnb">RNB</option>
                            <option value="Rock">Rock</option>
                            <option value="Country">Country</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <label className="form-label">Birthday</label>
                    <div className="row mb-3">
                        <div className="col-4">
                            <select class="form-select" aria-label="Default select example">
                                <option selected>M</option>
                                <option value="1">Jan</option>
                                <option value="2">Feb</option>
                                <option value="3">Mar</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <select class="form-select col-4" aria-label="Default select example">
                                <option selected>D</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className="col-4">
                            <input type="number" className="form-control col-4" value={1980}/>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <label>Picture</label>
                    {/* <input type="file" ref={file} className="form-input"/> */}
                    <div class="mb-3">
                        <input className="form-control" ref={file} type="file" id="formFile"/>
                    </div>
                </div>
                
                <button className="btn btn-outline-dark col-12 mt-3" type="submit"><i class="fas fa-save"></i> Save</button>
            </form>
        </div>
    )
}
