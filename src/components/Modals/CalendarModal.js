
import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from '@material-ui/core/Button'
import { addDays, subDays } from 'date-fns';
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Moment from 'react-moment'
import moment from 'moment'

export const CalendarModal = (props) => {
    const {show, onHide} = props
    const [date, setDate] = useState([
        {
            startDate: subDays(new Date(), 7),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    const close = () => {

        onHide()

    }
    const select = (item) => {
        setDate([item.selection]);
        setStart(item.selection.startDate)
        setEnd(item.selection.endDate)

    }

    return (
        <Modal

            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalHeader closeButton>

                <ModalTitle id="contained-modal-title-vcenter">
                    Selecciona el rango de fecha {start} - 
                </ModalTitle>
            </ModalHeader>
            <ModalBody className="flex justify-center items-center">
                <DateRange
                    onChange={item => select(item)}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={date}
                    direction="horizontal"
                    locale={locales['es']}

                />
            </ModalBody>
            <ModalFooter>
                <Button className='mx-2' variant="outlined" onClick={close}>Close</Button>
                <Button variant="contained" color="primary" onClick={select}>
                    Guardar
                </Button>
            </ModalFooter>

        </Modal>
    )
}
