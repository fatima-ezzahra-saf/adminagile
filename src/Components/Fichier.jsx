import React, { useState, useEffect } from "react";
import Axios from "axios";

const Fichier = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8080/getAllFile")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des données :", error));
  }, []);

  const handleDelete = (id) => {
    // Appeler l'API pour supprimer l'utilisateur avec l'ID spécifié
    Axios.delete(`http://localhost:8080/delete/${id}`)
      .then((response) => {
        console.log("Utilisateur supprimé avec succès !");
        // Mettre à jour les données après la suppression
        // Vous pouvez choisir de rafraîchir la page ou de recharger les données ici
      })
      .catch((error) => console.error("Erreur lors de la suppression de l'utilisateur :", error));
  };

  const handleDownload = (fileId) => {
    // Effectuer une requête pour télécharger le fichier en fonction de l'ID
    Axios.get(`http://localhost:8080/downloadFile/${fileId}`, {
      responseType: 'blob', // Indiquer le type de réponse comme blob (binaire)
    })
      .then((response) => {
        // Créer un objet URL pour le blob et créer un lien
        const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', 'file.pdf'); // Spécifier le nom du fichier ici
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Erreur lors du téléchargement du fichier :", error));
  };

  return (
    <>

<aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a class="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
        <img src="../assets/img/logo-ct.png" class="navbar-brand-img h-100" alt="main_logo"/>
        <span class="ms-1 font-weight-bold text-white">Material Dashboard 2</span>
      </a>
    </div>
    <hr class="horizontal light mt-0 mb-2"/>
    <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link text-white active bg-gradient-primary" href="/">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">dashboard</i>
            </div>
            <span class="nav-link-text ms-1">Dashboard</span>
          </a>
        </li>
      
       
     
     
        <li class="nav-item">
          <a class="nav-link text-white " href="/part">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">person</i>
            </div>
            <span class="nav-link-text ms-1">voir les participants</span>
          </a>
        </li>
       
        <li class="nav-item">
          <a class="nav-link text-white " href="/file">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i class="material-icons opacity-10">table_view</i>
            </div>
            <span class="nav-link-text ms-1">voir telechargements</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="sidenav-footer position-absolute w-100 bottom-0 ">
     
 



     
    </div>
  </aside>
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg "> 
  
  



       
        
      <li class="nav-item">
          <a class="nav-link text-white active bg-gradient-primary" href="../pages/dashboard.html">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
        
            </div>
            <span class="nav-link-text ms-1">liste des fichiers </span>
          </a>
        </li>
        <div>
        <h1>Table des fichiers</h1>

        {/* Affichage des fichiers de type "postere" */}
        <h2>Postere</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => item.type === 'postere')
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => handleDownload(item.id)}>Lire</button>
                    <button   onClick={() => handleDelete(item.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Affichage des fichiers de type "conference" */}
        <h2>Conference</h2>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => item.type === 'conference')
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => handleDownload(item.id)}>Lire</button>
                    <button onClick={() => handleDelete(item.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        
        
        </div>
        
</main>
    </>
  );
};

export default Fichier;
