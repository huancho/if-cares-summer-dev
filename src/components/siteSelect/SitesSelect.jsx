'use client';
import { API_URL_ENDPOINT, ROLES } from '@/constants/constants';
import React, { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';

const SitesSelect = ({
  siteSelected,
  setSiteSelected,
  errors,
  isLoadingSiteData,
}) => {
  const [sites, setSites] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(API_URL_ENDPOINT + '?type=sitesList')
      .then((res) => res.json())
      .then((data) => {
        const userData = JSON.parse(localStorage.getItem('ifcaresSummer'));
        setUserData(userData);
        if (userData && userData.role == ROLES.admin) {
          setSites(data);
        } else {
          const userSites = data.filter(
            (site) => site[0] == userData.assignedSite
          );
          setSites(userSites);
        }
      })
      .catch((e) => {
        console.error('Error:', e);
      });
  }, []);

  useEffect(() => {
    if (userData.role === ROLES.user && userData.assignedSite) {
      setSiteSelected(userData.assignedSite);
    }
  }, [userData]);

  return (
    <div className="flex items-center justify-end gap-5">
      {isLoadingSiteData && (
        <span className="self-start mt-2">
          <Spinner />
        </span>
      )}
      <div className="flex flex-col">
        <div
          className={`rounded-full p-[0.5px] bg-gradient-to-r from-indigo-100 via-indigo-600 to-indigo-100 hover:from-indigo-400 hover:via-indigo-100 hover:to-indigo-400 ${
            errors.siteSelected ? 'bg-none' : ''
          } ${
            userData.role == ROLES.user
              ? 'bg-none border border-indigo-600'
              : ''
          }`}
        >
          <select
            id="sites"
            className={`py-3 px-4 pe-9 block rounded-full text-sm min-w-[250px] focus:outline-none ${
              errors.siteSelected ? 'border border-red-600' : ''
            }`}
            disabled={userData.role == ROLES.user}
            onChange={(e) => setSiteSelected(e.target.value)}
          >
            {siteSelected == '' && <option value="">Select Site</option>}

            {userData.role == ROLES.user && (
              <option value={userData.assignedSite}>
                {userData.assignedSite}
              </option>
            )}

            {userData.role == ROLES.admin &&
              sites.map((site) => (
                <option key={site} value={site}>
                  {site}
                </option>
              ))}
          </select>
        </div>
        {errors.siteSelected && (
          <span className="text-xs text-red-600 ml-4 mt-1">
            {errors.siteSelected}
          </span>
        )}
      </div>
    </div>
  );
};

export default SitesSelect;
