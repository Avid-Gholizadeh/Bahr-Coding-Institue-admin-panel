import { useState, useMemo, useEffect, useCallback } from 'react';

export const useUsersListState = () => {
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isActiveUser, setIsActiveUser] = useState(null);
  const [isDeletedUser, setIsDeletedUser] = useState(null);
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'انتخاب کنید' });
  const [currentStatus, setCurrentStatus] = useState({ value: null, label: 'انتخاب کنید' });
  const [currentSort, setCurrentSort] = useState({ value: '', type: '', label: 'انتخاب کنید' });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const roleOptions = useMemo(() => [
    { value: '', label: 'انتخاب کنید' },
    { value: 1, label: 'ادمین' },
    { value: 2, label: 'استاد' },
    { value: 5, label: 'دانشجو' },
    { value: 8, label: 'داور' },
  ], []);

  const statusOptions = useMemo(() => [
    { value: '', label: 'انتخاب کنید' },
    { value: 1, label: 'کاربران غیر فعال' },
    { value: 2, label: 'کاربران فعال' },
    { value: 3, label: 'کاربران حذف شده' },
  ], []);

  const sortOptions = useMemo(() => [
    { value: '', type: '', label: 'انتخاب کنید' },
    { value: 'DESC', type: 'InsertDate', label: 'جدید ترین' },
    { value: 'ASC', type: 'InsertDate', label: 'قدیمی ترین' },
  ], []);

  return {
    state: {
      sortColumn, sortOrder, rowsPerPage, pageNumber, query, sidebarOpen,
      isActiveUser, isDeletedUser, currentRole, currentStatus, currentSort,
    },
    actions: {
      setSortColumn, setSortOrder, setRowsPerPage, setPageNumber, setQuery,
      setIsActiveUser, setIsDeletedUser, setCurrentRole, setCurrentStatus, setCurrentSort,
      toggleSidebar,
    },
    options: { roleOptions, statusOptions, sortOptions },
  };
};
