/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { GetRequestAPI } from '../common/GetRequest';
import { API_CREATE_TASK, API_DELETE_TASK, API_GET_TASK, API_UPDATE_TASK, App_url } from '../common/Constant';
import { setStoreTaskList } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {  Button, Form, IconButton, Input, Modal, Panel, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { PutRequestCallAPI } from '../common/PutRequest';
import { PostRequestCallAPI } from '../common/PostRequest';
import { DeleteRequest } from '../common/DeleteRequest';

export default function Home() {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState({
        item:"",
        priority:"low"
    })
    const [error, setError] = useState({
        item:"",
        priority:""
    })
    const options = [
        {label:"Low", value:"low"},
        {label:"Medium", value:"medium"},
        {label:"High", value:"high"},
    ]
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setFormData({
            item:"",
            priority:"low"
        })
    }
    const {taskList} = useSelector(state=>state?.allReducers);
    const dispatch = useDispatch();
    useEffect(()=>{
        callGetTaskList()
    },[]);

    const callGetTaskList = async () =>{
        const response = await GetRequestAPI(API_GET_TASK);
        if(response?.status === 200){
            dispatch(setStoreTaskList(response?.data?.data))
        }else{
            dispatch(setStoreTaskList([]))
            console.log("response", response)
        }
    }

    const getWeekName = (date) => {
        const today = new Date();
        const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const lastDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);
    
        if (date >= firstDayOfWeek && date <= lastDayOfWeek) {
            return 'This Week';
        } else {
            const options = { weekday: 'long', day: 'numeric', month: 'long' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        }
    };
  
    const groupByWeekAndDate = (list) => {
        const grouped = [];
        list.forEach(item => {
        const dateObj = new Date(item.addDate);
        const week = getWeekName(dateObj);
        const date = new Intl.DateTimeFormat('en-US', { weekday: 'long', day: 'numeric', month: 'long' }).format(dateObj);
        
        // Check if week already exists
        let existingWeek = grouped.find(weekObj => weekObj.week === week);
        if (!existingWeek) {
            existingWeek = { week, list: [] };
            grouped.push(existingWeek);
        }

        // Check if date already exists in the week
        let existingDate = existingWeek.list.find(dateObj => dateObj.date === date);
        if (!existingDate) {
            existingDate = { date, list: [] };
            existingWeek.list.push(existingDate);
        }

        // Push the item to the date list
        existingDate.list.push(item);
        });
        return grouped;
    };
    const groupedData = groupByWeekAndDate(taskList);
    // console.log("data", JSON.stringify(taskList), groupedData);
    const onSelect = (e) =>{
        setFormData((data)=>({
            ...data,
            priority: e
        }))
        setError({
            ...error,
            priority: ""
        })
    }
    const onChange = (e) =>{
        setFormData((data)=>({
            ...data,
            item: e
        }))
        setError({
            ...error,
            item: ""
        })
    }
    const validation = () =>{
        let val = true;
        if(!formData?.item){
            error.item = "This field is required"
            val = false
        }
        if(!formData?.priority){
            error.priority = "This field is required"
            val = false
        }
        setError((e)=>({
            ...e,
            ...error,
        }))
        return val;
    }
    const getRequestResponse = async (formData, is_delete) =>{
        if(is_delete){
            return await DeleteRequest(API_DELETE_TASK, formData)
        }else if(formData?.id){
            return await PutRequestCallAPI(API_UPDATE_TASK, formData)
        }else {
            return await PostRequestCallAPI(API_CREATE_TASK, formData)
        }
    }
    const callFormSubmit = async (e) =>{
        e.preventDefault();
        if(validation()){
            const payload={};
            if(formData?.item){
                payload.item = formData?.item
            }
            if(formData?.priority){
                payload.priority = formData?.priority
            }
            if(formData?.id){
                payload.id = formData?.id
            }
            const response = await getRequestResponse(payload);
            if(response?.status === 200){
                callGetTaskList();
                handleClose()
            }
        }
    }
    const onEditModal = (item) =>{
        setFormData({
            item: item?.item,
            priority: item?.priority,
            id: item?.id,
        })
        handleOpen();
    }
    const onDeleteModal = async (item) =>{
        const payload = {
            id: item?.id,
            "type":2,
            "sort":2
        }
        console.log("payload", payload)
        const response = await getRequestResponse(payload, true);
        if(response?.status === 200){
            callGetTaskList();
            handleClose()
        }
    }
    const WeekTaskList = ({week}) =>{
        return(
            <div className='week-list'>
                <h6>{week?.week}</h6>
                {week?.list?.map((item, index)=>(
                    <React.Fragment key={index}>
                        <p className='text-primary'>{item?.date}</p>
                        {item?.list?.map((item, index)=>(
                            <React.Fragment key={index}>
                                <Panel  bordered>
                                    <div className='action'>
                                        <img onClick={(e)=>onEditModal(item)} src={App_url.EditIcon} alt={App_url.EditIcon} />
                                        <img onClick={(e)=>onDeleteModal(item)} src={App_url.Delete} alt={App_url.Delete} />
                                    </div>
                                    <p>{item?.item}</p>
                                    <span className={`priority priority-${item?.priority}`} >{item?.priority}</span>
                                </Panel>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        )
    }

  return (
    <div className='bg-pink main-div'>
      <div className='modal-body-mobile'>
        <div className='card custom_scroll_bar'>
            <div className='card-body '>
                <h5 className='mb-4'>To Do List</h5>
                {groupedData?.map((week, index)=>(
                    <React.Fragment key={index}>
                        <WeekTaskList week={week} index={index} />
                    </React.Fragment>
                ))}
                    
            </div>
        </div>
        <IconButton onClick={handleOpen} icon={<img src={App_url.Plus} alt={App_url.Plus} />} className='fixed-button primary'/>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        size={"sm"}
      >
        <Form.Group className='mb-4'>
            <label>Task:</label>
            <Input
                htmlSize={10}
                style={{ width: '100%' }}
                onChange={onChange}
                value={formData?.item}
                name='item'
                placeholder='Task'
            />
            {error?.item && <Form.HelpText color='red'>{error?.item}</Form.HelpText>}
        </Form.Group>
        <div className='mb-4'>
            <label>Priority:</label>
            <SelectPicker
                searchable={false}
                data={options}
                style={{ width: "100%" }}
                onSelect={onSelect}
                onClean={()=>onSelect("")}
                value={formData?.priority       }
            />
            {error?.priority && <Form.HelpText color='red'>{error?.priority}</Form.HelpText>}
        </div>
            <div style={{paddingTop: 10, textAlign: "right"}}>
                <Button onClick={callFormSubmit}>{formData?.id ?"Update Task":"Add Task"}</Button>
            </div>
      </Modal>
    </div>
  )
}
