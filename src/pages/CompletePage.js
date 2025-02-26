import React from "react";
import Sidebar from "../components/ui/Sidebar";
import CompletedTodoList from "../components/ui/todo/CompletedTodoList";
import AllTodosLoader from "../components/ui/todo/AllTodosLoader"; 

const CompletePage = () => {
    return (
        <div>
            <Sidebar />
            <AllTodosLoader />
            <CompletedTodoList />
        </div>
    );
}
export default CompletePage;