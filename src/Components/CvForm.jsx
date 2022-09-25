import React from 'react'

const CvForm = () => {
    return (
        <div className='cv-form-main-div'>
            <form>
                <div className='cv-form-container'>
                    <div className='cv-personal-info cvF-container-child'>
                        <div className='cvF-name-div'>
                            <div className='cvF-name-child'>
                                <label htmlFor="">Name</label>
                                <input type="text" className='cvF-name-input' />
                            </div>
                            <div className='cvF-name-child'>
                                <label htmlFor="">surname</label>
                                <input type="text" className='cvF-surname-input' />
                            </div>
                        </div>
                        <div className='cvF-info-child2'>
                            <div className='cvF-info-child3'>
                                <div className='cvF-info-child3-title-holder'>
                                    <label htmlFor="">Title</label>
                                    <input type="text" className='cvF-title-input' />
                                </div>
                                <div className='cvF-contactInfo-container'>
                                    <div>
                                        <label htmlFor="">Email</label>
                                        <input type="text" className='cvF-email-input' />
                                    </div>
                                    <div>
                                        <label htmlFor="">phone number</label>
                                        <input type="text" className='cvF-phone-input' />
                                    </div>
                                </div>
                            </div>
                            <div className='cvF-info-child3-title-holder'>
                                <label htmlFor="">address</label>
                                <input type="text" className='cvF-address-input' />
                            </div>
                        </div>
                    </div>
                    <div className='cvF-experience-div cvF-container-child'>
                        <div>
                            +
                            <div className='cvF-exp-input-container'>
                                <label htmlFor="">title</label>
                                <input type="text" className='cvF-exp-title-input' />
                                <label htmlFor="">from</label>
                                <input type="date" className='cvF-exp-startDate-input' />
                                <label htmlFor="">to</label>
                                <input type="date" className='cvF-exp-endDate-input' />
                                <label htmlFor="">city</label>
                                <input type="text" className='cvF-exp-city-input' />
                                <label htmlFor="">company</label>
                                <input type="text" className='cvF-exp-company-input' />
                                <label htmlFor="">description</label>
                                <textarea type="text" className='cvF-exp-description' />
                            </div>
                        </div>
                    </div>
                    <div className='cvF-education-div cvF-container-child'>
                        <label htmlFor="">title</label>
                        <input type="text" className='cvF-edu-title-input' />
                        <label htmlFor="">from</label>
                        <input type="date" className='cvF-edu-startDate-input' />
                        <label htmlFor="">to</label>
                        <input type="date" className='cvF-edu-endDate-input' />
                        <label htmlFor="">city</label>
                        <input type="text" className='cvF-edu-city-input' />
                        <label htmlFor="">major</label>
                        <input type="text" className='cvF-edu-major-input' />
                        <label htmlFor="">establishment</label>
                        <input type="text" className='cvF-edu-establishment-input' />
                        <label htmlFor="">degree</label>
                        <input type="text" className='cvF-edu-degree-input' />
                        <label htmlFor="">description</label>
                        <textarea type="text" className='cvF-edu-description' />
                    </div>
                    <div className="cvF-skills-div cvF-container-child">
                        <label htmlFor="">softskills</label>
                        <input type="text" className='cvF-softskills-input' />
                        <label htmlFor="">hardskills</label>
                        <input type="text" className='cvF-hardskills-input' />
                    </div>
                    <div className='cvF-exp-docs cvF-container-child'>
                        <label htmlFor="">Upload the documents that justifies your experience</label>
                        <input type="file" className='cvF-expDoc-input' />
                    </div>
                    <div className='cvF-achievements-div cvF-container-child'>
                        <label htmlFor="">Upload what you achieved professionally in your career</label>
                        <input type="file" className='cvF-achievements-input' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CvForm