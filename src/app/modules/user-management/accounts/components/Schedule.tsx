/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'

const Schedule: React.FC = () => {
  const [loading, setLoading] = useState(false)
  
  return (
    <div className='card'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_deactivate'
        aria-expanded='true'
        aria-controls='kt_account_deactivate'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Цагийн хуваарь</h3>
        </div>
      </div>

      <div id='kt_account_deactivate' className='collapse show'>
        <form id='kt_account_deactivate_form' className='form'>
          <div className="card-body border-top p-9 pt-4">
            
            <ul className="nav nav-pills d-flex flex-nowrap hover-scroll-x py-2">
              
              <li className="nav-item me-1">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-40px me-2 py-4 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_0">
                  <span className="opacity-50 fs-7 fw-bold">Su</span>
                  <span className="fs-6 fw-boldest">21</span>
                </a>
              </li>
              
              
              <li className="nav-item me-1">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-40px me-2 py-4 btn-active-primary active" data-bs-toggle="tab" href="#kt_schedule_day_1">
                  <span className="opacity-50 fs-7 fw-bold">Mo</span>
                  <span className="fs-6 fw-boldest">22</span>
                </a>
              </li>
              
              
              <li className="nav-item me-1">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-40px me-2 py-4 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_2">
                  <span className="opacity-50 fs-7 fw-bold">Tu</span>
                  <span className="fs-6 fw-boldest">23</span>
                </a>
              </li>
              
              
              <li className="nav-item me-1">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-40px me-2 py-4 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_3">
                  <span className="opacity-50 fs-7 fw-bold">We</span>
                  <span className="fs-6 fw-boldest">24</span>
                </a>
              </li>
              
              
              <li className="nav-item me-1">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-40px me-2 py-4 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_4">
                  <span className="opacity-50 fs-7 fw-bold">Th</span>
                  <span className="fs-6 fw-boldest">25</span>
                </a>
              </li>
              
              
              <li className="nav-item me-1">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-40px me-2 py-4 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_5">
                  <span className="opacity-50 fs-7 fw-bold">Fr</span>
                  <span className="fs-6 fw-boldest">26</span>
                </a>
              </li>
              
              
              <li className="nav-item me-1">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-40px me-2 py-4 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_6">
                  <span className="opacity-50 fs-7 fw-bold">Sa</span>
                  <span className="fs-6 fw-boldest">27</span>
                </a>
              </li>
              
              
              <li className="nav-item me-1">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-40px me-2 py-4 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_7">
                  <span className="opacity-50 fs-7 fw-bold">Su</span>
                  <span className="fs-6 fw-boldest">28</span>
                </a>
              </li>
              
              
              <li className="nav-item me-1">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-40px me-2 py-4 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_8">
                  <span className="opacity-50 fs-7 fw-bold">Mo</span>
                  <span className="fs-6 fw-boldest">29</span>
                </a>
              </li>
              
              
              <li className="nav-item me-1">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-40px me-2 py-4 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_9">
                  <span className="opacity-50 fs-7 fw-bold">Tu</span>
                  <span className="fs-6 fw-boldest">30</span>
                </a>
              </li>
              
              
              <li className="nav-item me-1">
                <a className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-40px me-2 py-4 btn-active-primary" data-bs-toggle="tab" href="#kt_schedule_day_10">
                  <span className="opacity-50 fs-7 fw-bold">We</span>
                  <span className="fs-6 fw-boldest">31</span>
                </a>
              </li>
              
            </ul>
            
            
            <div className="tab-content">
              
              <div id="kt_schedule_day_0" className="tab-pane fade show">
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">14:30 - 15:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">9 Degree Project Estimation Meeting</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Sean Bean</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">9:00 - 10:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Committee Review Approvals</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Sean Bean</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">11:00 - 11:45
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">9 Degree Project Estimation Meeting</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Walter White</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
              </div>
              
              
              <div id="kt_schedule_day_1" className="tab-pane fade show active">
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">13:00 - 14:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Project Review &amp; Testing</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Kendell Trevor</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">9:00 - 10:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Dashboard UI/UX Design Review</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Bob Harris</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">10:00 - 11:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Development Team Capacity Review</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Peter Marcus</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">10:00 - 11:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Development Team Capacity Review</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Kendell Trevor</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
              </div>
              
              
              <div id="kt_schedule_day_2" className="tab-pane fade show">
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">13:00 - 14:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Project Review &amp; Testing</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Bob Harris</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">12:00 - 13:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Committee Review Approvals</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Caleb Donaldson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">11:00 - 11:45
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">9 Degree Project Estimation Meeting</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Mark Randall</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
              </div>
              
              
              <div id="kt_schedule_day_3" className="tab-pane fade show">
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">11:00 - 11:45
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Project Review &amp; Testing</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Kendell Trevor</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">14:30 - 15:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">9 Degree Project Estimation Meeting</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Karina Clarke</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">16:30 - 17:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Lunch &amp; Learn Catch Up</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Terry Robins</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
              </div>
              
              
              <div id="kt_schedule_day_4" className="tab-pane fade show">
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">11:00 - 11:45
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Weekly Team Stand-Up</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">David Stevenson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">9:00 - 10:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Project Review &amp; Testing</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">David Stevenson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">9:00 - 10:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Project Review &amp; Testing</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Naomi Hayabusa</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">13:00 - 14:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Dashboard UI/UX Design Review</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Peter Marcus</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">9:00 - 10:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">9 Degree Project Estimation Meeting</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Kendell Trevor</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
              </div>
              
              
              <div id="kt_schedule_day_5" className="tab-pane fade show">
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">14:30 - 15:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Committee Review Approvals</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Sean Bean</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">13:00 - 14:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Project Review &amp; Testing</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Naomi Hayabusa</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">16:30 - 17:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Lunch &amp; Learn Catch Up</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Terry Robins</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
              </div>
              
              
              <div id="kt_schedule_day_6" className="tab-pane fade show">
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">12:00 - 13:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Weekly Team Stand-Up</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Caleb Donaldson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">11:00 - 11:45
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Development Team Capacity Review</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Kendell Trevor</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">16:30 - 17:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Development Team Capacity Review</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Naomi Hayabusa</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">13:00 - 14:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Lunch &amp; Learn Catch Up</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Caleb Donaldson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
              </div>
              
              
              <div id="kt_schedule_day_7" className="tab-pane fade show">
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">11:00 - 11:45
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Development Team Capacity Review</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">David Stevenson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">10:00 - 11:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Project Review &amp; Testing</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Peter Marcus</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">14:30 - 15:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">9 Degree Project Estimation Meeting</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Sean Bean</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">9:00 - 10:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Creative Content Initiative</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Naomi Hayabusa</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">16:30 - 17:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Project Review &amp; Testing</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Kendell Trevor</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
              </div>
              
              
              <div id="kt_schedule_day_8" className="tab-pane fade show">
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">13:00 - 14:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Team Backlog Grooming Session</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Naomi Hayabusa</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">14:30 - 15:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Dashboard UI/UX Design Review</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Bob Harris</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">10:00 - 11:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">9 Degree Project Estimation Meeting</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Caleb Donaldson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">10:00 - 11:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Weekly Team Stand-Up</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Sean Bean</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">12:00 - 13:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Committee Review Approvals</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Walter White</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
              </div>
              
              
              <div id="kt_schedule_day_9" className="tab-pane fade show">
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">12:00 - 13:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Marketing Campaign Discussion</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Caleb Donaldson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">16:30 - 17:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Development Team Capacity Review</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Caleb Donaldson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">16:30 - 17:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Project Review &amp; Testing</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Caleb Donaldson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">9:00 - 10:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Project Review &amp; Testing</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">David Stevenson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">12:00 - 13:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Marketing Campaign Discussion</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Mark Randall</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
              </div>
              
              
              <div id="kt_schedule_day_10" className="tab-pane fade show">
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">13:00 - 14:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Lunch &amp; Learn Catch Up</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Walter White</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">16:30 - 17:30
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Lunch &amp; Learn Catch Up</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Caleb Donaldson</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">10:00 - 11:00
                    <span className="fs-7 text-muted text-uppercase">am</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">9 Degree Project Estimation Meeting</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Kendell Trevor</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
                
                <div className="d-flex flex-stack position-relative mt-6">
                  
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>
                  
                  
                  <div className="fw-bold ms-5">
                    
                    <div className="fs-7 mb-1">12:00 - 13:00
                    <span className="fs-7 text-muted text-uppercase">pm</span></div>
                    
                    
                    <a href="#" className="fs-5 fw-bolder text-dark text-hover-primary mb-2">Committee Review Approvals</a>
                    
                    
                    <div className="fs-7 text-muted">Lead by
                    <a href="#">Peter Marcus</a></div>
                    
                  </div>
                  
                 
                  <a href="#" className="btn btn-light bnt-active-light-primary btn-sm">View</a>
                 
                </div>
                
              </div>
              
            </div>
            
          </div>
        </form>
      </div>
    </div>
  )
}

export {Schedule}
