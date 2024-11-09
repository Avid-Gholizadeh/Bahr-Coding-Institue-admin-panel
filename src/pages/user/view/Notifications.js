// React and Reactstrap Imports
import { useState } from 'react';
import { Card, CardTitle, CardBody, Table, Input, Button } from 'reactstrap';
import { AddRole } from '../../../@core/services/api/User';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

// Hook for AddRole mutation
const useAddRoleMutation = () => {
  return useMutation({
    mutationFn: ({ roleId, userId }) => AddRole(roleId, userId),
    onSuccess: () => {
      toast.success('نقش‌ها با موفقیت به‌روزرسانی شدند');
    },
    onError: () => {
      toast.error('خطا در به‌روزرسانی نقش‌ها');
    },
  });
};

// Notifications Component
const Notifications = ({ user }) => {
  const addRoleMutation = useAddRoleMutation();

  // Define roles with mappings to role IDs
  const roles = [
    { label: 'دانشجو', id: 5, key: 'Student' },
    { label: 'استاد', id: 2, key: 'Teacher' },
    { label: 'ادمین', id: 1, key: 'Administrator' }
  ];

  // Initial checked state for each role based on user data
  const [checkedRoles, setCheckedRoles] = useState(() =>
    roles.reduce((acc, role) => {
      acc[role.key] = user.roles.some(userRole => userRole.roleName === role.key);
      return acc;
    }, {})
  );

  // State to keep track of changes to be saved
  const [pendingChanges, setPendingChanges] = useState(checkedRoles);

  // Checkbox change handler to update pending changes
  const handleCheckboxChange = (roleKey, isChecked) => {
    setPendingChanges(prev => ({ ...prev, [roleKey]: isChecked }));
  };

  // Button handler to save role changes
  const saveChanges = () => {
    Object.entries(pendingChanges).forEach(([roleKey, isChecked]) => {
      const role = roles.find(r => r.key === roleKey);
      if (role && checkedRoles[roleKey] !== isChecked) {
        addRoleMutation.mutate({ roleId: role.id, userId: user.id });
      }
    });
    setCheckedRoles(pendingChanges); // Update the checked roles after saving
  };

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-50" tag="h4">
          نقش
        </CardTitle>
        <p> نقشی را انتخاب و سپس تایید کنید </p>
      </CardBody>
      <Table className="text-nowrap text-center border-bottom" responsive>
        <thead>
          <tr>
            {roles.map(role => (
              <th key={role.id}>{role.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {roles.map(role => (
              <td key={role.id}>
                <div className="d-flex form-check justify-content-center">
                  <Input
                    type="checkbox"
                    checked={pendingChanges[role.key]}
                    onChange={(e) => handleCheckboxChange(role.key, e.target.checked)}
                  />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
      <CardBody className='m-auto '>
        <Button color="primary"  onClick={saveChanges}>
          ذخیره تغییرات
        </Button>
      </CardBody>
    </Card>
  );
};

export default Notifications;
