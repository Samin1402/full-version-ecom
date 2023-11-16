import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import jwtDefaultConfig from '@src/@core/auth/jwt/jwtDefaultConfig'
import Avatar from '@components/avatar'
import { useTranslation } from 'react-i18next'
import { Badge, Row, Col, Card, CardBody } from 'reactstrap'
import { MoonLoader } from "react-spinners";
import UILoader from '@components/ui-loader'
import { Archive, ExternalLink, Briefcase, Truck, DollarSign, BookOpen, TrendingUp } from 'react-feather'
import AvatarGroup from '@components/avatar-group'
const coolrsArr = {
  Suppliers: 'light-primary',
  Estimates: 'light-secondary',
  'Pickup Requests': 'light-success',
  Trips: 'light-secondary',
  Tickets: 'light-warning',
  "Payment Requests": 'light-info',
  active: 'light-success',
  inactive: 'light-danger'
}

const Dashboard = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const getData = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${jwtDefaultConfig.main_url}/web/user/dashboard`, { params: { data } })
      if (response.data.code === 200) {
        setData(response.data.data.allcounts)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getData()
  }, [])
  let avatars = []
  if (data.length > 0) {
    const supplierTitles = data[0].items.map((el) => {
      avatars.push({ title: el.title, size: 'sm', initials: true, content: el.title });
    })
  }
  return (
    <Fragment>
      <UILoader className='' blocking={isLoading} overlayColor='rgba(61, 81, 140, 0.4)' loader={<MoonLoader color='#00A4EF' />}>
        <Row>
          {data ? data.map((item, index) => {
            console.log(item, 'Item')
            return (
              <Col key={index} l={4} md={4} >
                <Card>
                  <CardBody>
                    <div className='d-flex justify-content-between'>
                      {item.name === 'Suppliers' ? <span><Badge pill color={coolrsArr['active']}> {t("Active")} {`${item.count}`}</Badge> / <Badge pill color={coolrsArr['inactive']}> {t("Inactive")} {`${item.inactive_suppliers_count}`}</Badge>
                      </span> : ''}
                      {item.name === 'Estimates' ? <span><Badge pill color={coolrsArr['active']}>{t("All Estimates")} {`${item.count}`}</Badge></span> : ''}
                      {item.name === 'Pickup Requests' ? <span><Badge pill color={coolrsArr['active']}>{t("All Pickup Requests")} {`${item.count}`}</Badge></span> : ''}
                      {item.items ? <AvatarGroup data={avatars} /> : null}
                      {item.name === 'Tickets' ? <span><Badge pill color={coolrsArr['active']}>{t("Open")} {`${item.count}`}</Badge> / <Badge pill color={coolrsArr['inactive']}>{t("Closed")} {`${item.closed_ticket_count}`}</Badge>
                      </span> : ''}
                      {item.name === 'Payment Requests' ? <span><Badge pill color={coolrsArr['inactive']}>{t("Pending")} {`${item.count}`}</Badge> / <Badge pill color={coolrsArr['active']}>{t("Completed")} {`${item.completed_count}`}</Badge>
                      </span> : ''}
                      {item.name === 'Trips' ? <span><Badge pill color={coolrsArr['active']}>{t("Live")} {`${item.count}`}</Badge> / <Badge pill color={coolrsArr['inactive']}>{t("Completed")} {`${item.closed_trips_count}`}</Badge>
                      </span> : ''}
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-2 pt-25'>
                      {item.name === 'Suppliers' ? <Avatar color={coolrsArr[item.name]} icon={<Briefcase size={18} />} className='m-0' /> : ''}
                      {item.name === 'Pickup Requests' ? <Avatar color={coolrsArr[item.name]} icon={<Archive size={18} />} className='m-0' /> : ''}
                      {item.name === 'Payment Requests' ? <Avatar color={coolrsArr[item.name]} icon={<DollarSign size={18} />} className='m-0' /> : ''}
                      {item.name === 'Tickets' ? <Avatar color={coolrsArr[item.name]} icon={<BookOpen size={18} />} className='m-0' /> : ''}
                      {item.name === 'Estimates' ? <Avatar color={coolrsArr[item.name]} icon={<TrendingUp size={18} />} className='m-0' /> : ''}
                      {item.name === 'Trips' ? <Avatar color={coolrsArr[item.name]} icon={<Truck size={18} />} className='m-0' /> : ''}
                      <div className='role-heading'>
                        <h4 className='fw-bolder'>{t(item.name).toUpperCase()}</h4>
                      </div>
                      {item.web_link ? <Link to={item.web_link} className='text-body' >
                        <ExternalLink className='font-medium-5' />
                      </Link> : "-"}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )
          }) : null}
        </Row>
      </UILoader>
    </Fragment>
  )
}

export default Dashboard
